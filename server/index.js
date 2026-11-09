import "dotenv/config";
import express from "express";
import cors from "cors";
import crypto from "node:crypto";
import Razorpay from "razorpay";

const app = express();
const PORT = process.env.PORT || 4242;
const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173,http://localhost:4173")
  .split(",").map((origin) => origin.trim()).filter(Boolean);

app.use(cors({ origin(origin, callback) {
  if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error("Origin not allowed by CORS"));
} }));
app.use(express.json({ limit: "20kb" }));

const catalog = {
  1: { name: "My First Tracing Book", price: 149 },
  2: { name: "My Fun Activity Book", price: 149 },
  3: { name: "My First Maths Book", price: 149 },
};

function calculateTotal(productIds) {
  if (!Array.isArray(productIds) || productIds.length < 1 || productIds.length > 3) {
    throw new Error("Choose between 1 and 3 workbooks.");
  }
  const ids = productIds.map(Number);
  if (new Set(ids).size !== ids.length || ids.some((id) => !catalog[id])) {
    throw new Error("Your cart contains an invalid workbook selection.");
  }
  if (ids.length === 1) return 149;
  if (ids.length === 2) return 250;
  return 300;
}

function getRazorpay() {
  if (!KEY_ID || !KEY_SECRET) throw new Error("Razorpay is not configured on the server. Add your API keys to server/.env.");
  return new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });
}

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "Little Learners payments" }));

app.post("/api/payments/create-order", async (req, res) => {
  try {
    const amountRupees = calculateTotal(req.body?.productIds);
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: amountRupees * 100,
      currency: "INR",
      receipt: `ll_${Date.now()}`,
      notes: { product_ids: req.body.productIds.map(String).join(","), store: "Little Learners" },
    });
    res.json({ keyId: KEY_ID, orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error("Create order error:", error.message);
    res.status(400).json({ error: error.message || "Unable to create payment order." });
  }
});

app.post("/api/payments/verify", async (req, res) => {
  try {
    const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body || {};
    if (!orderId || !paymentId || !signature) return res.status(400).json({ verified: false, error: "Missing payment verification details." });

    const expected = crypto.createHmac("sha256", KEY_SECRET).update(`${orderId}|${paymentId}`).digest("hex");
    const expectedBuffer = Buffer.from(expected, "hex");
    const receivedBuffer = Buffer.from(signature, "hex");
    if (expectedBuffer.length !== receivedBuffer.length || !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)) {
      return res.status(400).json({ verified: false, error: "Payment signature could not be verified." });
    }

    const razorpay = getRazorpay();
    const [payment, order] = await Promise.all([
      razorpay.payments.fetch(paymentId),
      razorpay.orders.fetch(orderId),
    ]);
    if (payment.order_id !== orderId || payment.amount !== order.amount || order.currency !== "INR") {
      return res.status(400).json({ verified: false, error: "Payment details do not match this order." });
    }
    if (payment.status === "authorized") {
      await razorpay.payments.capture(paymentId, payment.amount, payment.currency);
    } else if (payment.status !== "captured") {
      return res.status(400).json({ verified: false, error: `Payment status is ${payment.status}.` });
    }

    res.json({ verified: true, orderId, paymentId, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error("Payment verification error:", error.message);
    res.status(500).json({ verified: false, error: "We could not verify this payment yet. Please contact support with your payment ID." });
  }
});

app.listen(PORT, () => console.log(`Little Learners payment API listening on port ${PORT}`));
