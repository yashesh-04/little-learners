import { useEffect, useRef, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "My First Tracing Book",
    age: "Ages 2–6",
    pages: "63 pages",
    description:
      "Build pencil control with lines, shapes, letters, numbers and fun colouring activities.",
    theme: "tracing",
    icon: "✏️",
    label: "LEARN TO WRITE",
    details: ["Pre-writing strokes", "A–Z tracing", "Numbers 1–20", "Colouring pages"],
    intro: "A gentle first step towards writing. Children begin with simple pencil paths and gradually practise shapes, letters and numbers.",
    highlights: [
      { title: "Pre-writing strokes", description: "Standing, sleeping and slanting lines, plus zigzags, waves, hills, loops and spirals." },
      { title: "Shapes and paths", description: "Trace and draw familiar shapes, then follow paths from one picture to another." },
      { title: "Letters A–Z", description: "Practise capital and small letters, match pictures to starting letters, and trace letter pairs." },
      { title: "Numbers 1–20", description: "Trace numbers, count pictures, and practise counting and writing numbers." },
      { title: "Patterns and creativity", description: "Odd-one-out activities, finish-the-pattern exercises, dot-to-dot puzzles and colouring pages." },
    ],
    samplePages: [
      { page: 3, title: "Standing & Sleeping Lines", image: "/previews/tracing-03.jpg" },
      { page: 9, title: "Shapes: Round & Straight", image: "/previews/tracing-09.jpg" },
      { page: 11, title: "Letters Aa & Bb", image: "/previews/tracing-11.jpg" },
      { page: 24, title: "Capital Letters A–M", image: "/previews/tracing-24.jpg" },
      { page: 45, title: "Count & Write", image: "/previews/tracing-45.jpg" },
    ],
  },
  {
    id: 2,
    name: "My Fun Activity Book",
    age: "Ages 3–6",
    pages: "30 pages",
    description:
      "Keep little minds busy with mazes, puzzles, matching, colouring and creative drawing.",
    theme: "activity",
    icon: "🧩",
    label: "PLAY & DISCOVER",
    details: ["Fun mazes", "Spot the difference", "Shadow matching", "Creative drawing"],
    intro: "A playful collection of puzzles and creative activities that invites children to look closely, follow clues and use their imagination.",
    highlights: [
      { title: "Mazes", description: "Help the cat, duck, kite and lion find their way to the right destination." },
      { title: "Spot the difference", description: "Find five differences in garden, pond and toy-room picture pairs." },
      { title: "I Spy and shadow matching", description: "Count objects in picture scenes and match familiar pictures to their shadows." },
      { title: "Colouring and drawing", description: "Colour friendly pictures, finish half-drawn animals, and connect dots to make a crown or ice cream." },
      { title: "Imagination games", description: "Draw funny faces, imagine what is inside a magic box, design a hat for a cat and follow tangled strings." },
    ],
    samplePages: [
      { page: 3, title: "Help the Cat Find the Fish!", image: "/previews/activity-03.jpg" },
      { page: 7, title: "Spot the Difference: Garden", image: "/previews/activity-07.jpg" },
      { page: 12, title: "Match the Shadow", image: "/previews/activity-12.jpg" },
      { page: 14, title: "Color the Cat!", image: "/previews/activity-14.jpg" },
      { page: 24, title: "Dot to Dot: Crown", image: "/previews/activity-24.jpg" },
    ],
  },
  {
    id: 3,
    name: "My First Maths Book",
    age: "Ages 4–6",
    pages: "60 pages",
    description:
      "Make early maths fun with counting, number patterns, addition, subtraction and shapes.",
    theme: "maths",
    icon: "🔢",
    label: "NUMBERS MADE FUN",
    details: ["Counting 1–20", "Addition & subtraction", "Shapes & patterns", "Time & tally marks"],
    intro: "A step-by-step introduction to early maths, moving from counting and comparing to simple calculations, shapes and everyday number concepts.",
    highlights: [
      { title: "Counting and number sense", description: "Ten frames, missing numbers, before/after/between, number words, skip counting and counting back." },
      { title: "Compare and measure", description: "Count and circle, more and fewer, bigger and smaller numbers, and long, short and tall." },
      { title: "Addition", description: "Add groups of pictures, practise number sums and use a number line to hop forward." },
      { title: "Subtraction and number bonds", description: "Take away with pictures and numbers, make 10, and explore number bonds." },
      { title: "Shapes, patterns and time", description: "Shape names and matching, patterns, ordinal numbers, tally marks, clocks, days and months." },
      { title: "Creative number activities", description: "Dot-to-dot, colour by number, number paths, and drawing or colouring the right number." },
    ],
    samplePages: [
      { page: 3, title: "Ten Frames 1–5", image: "/previews/maths-03.jpg" },
      { page: 7, title: "Missing Numbers", image: "/previews/maths-07.jpg" },
      { page: 22, title: "Add with Pictures", image: "/previews/maths-22.jpg" },
      { page: 35, title: "Taking Away Numbers", image: "/previews/maths-35.jpg" },
      { page: 50, title: "Days of the Week", image: "/previews/maths-50.jpg" },
    ],
  },
];

function getPrice(count) {
  if (count === 0) return 0;
  if (count === 1) return 149;
  if (count === 2) return 250;
  return 300;
}

function BookCover({ product }) {
  return (
    <div className={`book-cover ${product.theme}`}>
      <div className="cover-top">LITTLE LEARNERS</div>
      <div className="cover-art">{product.icon}</div>
      <div className="cover-label">{product.label}</div>
      <h3>{product.name}</h3>
      <div className="cover-bottom">
        <span>{product.age}</span>
        <span>{product.pages}</span>
      </div>
    </div>
  );
}

function CartPopup({ added, count, total, onClose, onViewCart }) {
  useEffect(() => {
    const handleKeyDown = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const next = count + 1;
  const nudge = count >= 3
    ? "🎉 You've unlocked our best deal — all 3 workbooks for ₹300!"
    : `Add 1 more workbook and get ${next === 3 ? "all 3" : next} for ₹${getPrice(next)} — save ₹${next * 149 - getPrice(next)}.`;

  return (
    <div className="popup-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="popup-card" role="dialog" aria-modal="true" aria-labelledby="cart-popup-title">
        <button className="popup-close" onClick={onClose} aria-label="Close">×</button>
        <div className="popup-check">✓</div>
        <h3 id="cart-popup-title">{added.length > 1 ? `${added.length} workbooks added to your cart` : "Added to your cart!"}</h3>
        <div className="popup-items">
          {added.map((product) => (
            <div className="popup-item" key={product.id}>
              <span className={`popup-mini ${product.theme}`}>{product.icon}</span>
              <div><strong>{product.name}</strong><small>{product.pages} · {product.age}</small></div>
            </div>
          ))}
        </div>
        <div className="popup-summary"><span>{count} {count === 1 ? "workbook" : "workbooks"} in your cart</span><strong>₹{total}</strong></div>
        <p className="popup-nudge">{nudge}</p>
        <div className="popup-actions">
          <button className="popup-secondary" onClick={onClose}>Keep browsing</button>
          <button className="popup-primary" onClick={onViewCart} autoFocus>View cart →</button>
        </div>
      </div>
    </div>
  );
}

const CONFETTI_COLORS = ["#d48c64", "#8aa58e", "#f2c46d", "#7da6d9", "#e58f8f"];

function PaymentSuccessPopup({ order, onClose, onWhatsApp }) {
  useEffect(() => {
    const handleKeyDown = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="popup-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="popup-card success-popup" role="dialog" aria-modal="true" aria-labelledby="success-popup-title">
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <i key={i} style={{ left: `${(i * 37 + 8) % 100}%`, background: CONFETTI_COLORS[i % CONFETTI_COLORS.length], animationDelay: `${(i % 6) * 0.12}s` }} />
          ))}
        </div>
        <button className="popup-close" onClick={onClose} aria-label="Close">×</button>
        <div className="popup-check big">✓</div>
        <h3 id="success-popup-title">Payment successful! 🎉</h3>
        <p className="popup-sub">Thank you! Your payment of <strong>₹{order.total}</strong> has been verified.</p>
        <div className="popup-items">
          {order.names.map((name) => <div className="popup-item compact" key={name}>📘 <strong>{name}</strong></div>)}
        </div>
        <div className="popup-order-id"><small>Order ID</small><code>{order.orderId}</code></div>
        <div className="popup-nudge">
  Your workbooks are ready! Download your purchased PDFs below.
</div>

<div className="popup-actions stacked">
  {order.downloads?.length > 0 ? (
    order.downloads.map((download) => (
      <a
        key={download.url}
        href={download.url}
        className="popup-download"
      >
        <span>📥</span>
        Download {download.name}
      </a>
    ))
  ) : (
    <>
      <p>
        Your payment was successful, but download links are not available yet.
        Please contact us on WhatsApp with your order ID.
      </p>
      <button className="popup-whatsapp" onClick={onWhatsApp}>
        Get support on WhatsApp →
      </button>
    </>
  )}

  <button className="popup-secondary" onClick={onClose}>
    Close
  </button>
</div>
      </div>
    </div>
  );
}

function ProductDetails({ product, isSelected, onClose, onToggle }) {
  const [activePreview, setActivePreview] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (document.querySelector(".popup-backdrop")) return;
        if (activePreview) setActivePreview(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activePreview, onClose]);

  return (
    <div className="detail-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title">
        <button className="detail-close" onClick={onClose} aria-label="Close product details">×</button>
        <div className="detail-hero">
          <div className="detail-cover-wrap"><BookCover product={product} /></div>
          <div className="detail-intro">
            <span className="eyebrow">LITTLE LEARNERS WORKBOOK</span>
            <h2 id="detail-title">{product.name}</h2>
            <div className="detail-meta"><span>{product.age}</span><span>{product.pages}</span><span>Printable PDF</span></div>
            <p>{product.intro}</p>
            <div className="detail-price-row">
              <div><strong>₹149</strong><small>One-time purchase</small></div>
              <button className={isSelected ? "remove-button" : "add-button"} onClick={onToggle}>
                {isSelected ? "✓ Added to cart" : "Add to cart +"}
              </button>
            </div>
            <p className="detail-print-note">Downloadable workbook · Print at home on A4 paper</p>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-section-heading">
            <span className="eyebrow">TAKE A LOOK INSIDE</span>
            <h3>A few pages from the book</h3>
            <p>These are actual sample pages from the workbook.</p>
          </div>
          <div className="preview-grid">
            {product.samplePages.map((sample) => (
              <button className="preview-card" key={sample.page} onClick={() => setActivePreview(sample)}>
                <span className="preview-image-wrap"><img src={sample.image} alt={`${sample.title}, sample page ${sample.page}`} loading="lazy" /></span>
                <span className="preview-caption"><strong>{sample.title}</strong><small>Page {sample.page} · Click to enlarge</small></span>
              </button>
            ))}
          </div>

          <div className="detail-section-heading coverage-heading">
            <span className="eyebrow">WHAT'S INSIDE</span>
            <h3>What your child will explore</h3>
          </div>
          <div className="coverage-grid">
            {product.highlights.map((item, index) => (
              <div className="coverage-item" key={item.title}>
                <span className="coverage-number">{String(index + 1).padStart(2, "0")}</span>
                <div><h4>{item.title}</h4><p>{item.description}</p></div>
              </div>
            ))}
          </div>
          <div className="detail-bottom-note">
            <span>💛</span><p>Little and often works best. Sit together, encourage every attempt and let learning happen at your child's pace.</p>
          </div>
        </div>
      </section>

      {activePreview && (
        <div className="preview-lightbox" onMouseDown={(event) => event.target === event.currentTarget && setActivePreview(null)}>
          <button className="lightbox-close" onClick={() => setActivePreview(null)} aria-label="Close preview">×</button>
          <div className="lightbox-content">
            <img src={activePreview.image} alt={`${activePreview.title}, sample page ${activePreview.page}`} />
            <p>{activePreview.title} <span>· Page {activePreview.page}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState([]);
  const cartSectionRef = useRef(null);
  const [isCartInView, setIsCartInView] = useState(false);

  useEffect(() => {
    const cartSection = cartSectionRef.current;
    if (!cartSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsCartInView(entry.isIntersecting),
      { threshold: 0.12 }
    );

    observer.observe(cartSection);
    return () => observer.disconnect();
  }, []);
  const [activeProduct, setActiveProduct] = useState(null);

  const count = selected.length;
  const total = getPrice(count);
  const originalTotal = count * 149;
  const savings = originalTotal - total;

  const [cartPopup, setCartPopup] = useState(null);
  const [successPopup, setSuccessPopup] = useState(null);

  // Opens the "added to cart" popup for any book that wasn't in the cart before.
  function announceAdded(nextSelected) {
    const newlyAdded = products.filter((product) => nextSelected.includes(product.id) && !selected.includes(product.id));
    if (newlyAdded.length) setCartPopup(newlyAdded);
  }

  function toggleProduct(id) {
    const adding = !selected.includes(id);
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
    if (adding) announceAdded([...selected, id]);
  }

  function addProduct(id) {
    if (selected.includes(id)) return;
    setSelected([...selected, id]);
    announceAdded([...selected, id]);
  }

  function chooseBundle(ids) {
    setSelected(ids);
    announceAdded(ids);
  }

  function viewCartFromPopup() {
    setCartPopup(null);
    setActiveProduct(null);
    setTimeout(() => document.getElementById("cart")?.scrollIntoView({ behavior: "smooth" }), 60);
  }

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [verifiedOrderId, setVerifiedOrderId] = useState("");

  function orderOnWhatsApp(orderId = "") {
    const chosen = products.filter((product) => selected.includes(product.id));
    const message = [
      "Hello Little Learners! I'd like to enquire about an order:",
      ...chosen.map((product) => `• ${product.name}`),
      "",
      `Number of workbooks: ${count}`,
      `Bundle price: ₹${total}`,
      `You save: ₹${savings}`,
      ...(orderId ? [`Razorpay order ID: ${orderId}`, "Payment has been verified."] : []),
      "",
      orderId ? "Please share my PDF download links." : "I'd prefer to discuss the order on WhatsApp before paying.",
    ].join("\n");

    const phoneNumber = "6362862190";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  async function loadRazorpay() {
    if (window.Razorpay) return true;
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function payWithRazorpay() {
    if (!selected.length || paymentLoading) return;
    setPaymentLoading(true);
    setPaymentMessage("");
    setPaymentSuccess(false);
    setVerifiedOrderId("");
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      const scriptLoaded = await loadRazorpay();
      if (!scriptLoaded) throw new Error("Razorpay checkout could not be loaded. Please check your connection and try again.");

      const orderResponse = await fetch(`${apiBase}/api/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: selected }),
      });
      const orderData = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orderData.error || "Could not start payment. Please try again.");

      const checkout = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Little Learners",
        description: `${count} printable workbook${count > 1 ? "s" : ""}`,
        order_id: orderData.orderId,
        theme: { color: "#344e41" },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch(`${apiBase}/api/payments/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verification = await verifyResponse.json();
            if (!verifyResponse.ok || !verification.verified) throw new Error(verification.error || "Payment verification failed.");
            setPaymentSuccess(true);
            setVerifiedOrderId(response.razorpay_order_id);
            setCartPopup(null);
           setSuccessPopup({
  orderId: response.razorpay_order_id,
  total,
  names: products.filter((product) => selected.includes(product.id)).map((product) => product.name),
  downloads: verification.downloads || [],
});

setPaymentMessage(
  `Payment verified! Your order ID is ${response.razorpay_order_id}.`
);
          } catch (error) {
            setPaymentMessage(`${error.message} If money was deducted, please contact us on WhatsApp with your payment ID: ${response.razorpay_payment_id}`);
          } finally {
            setPaymentLoading(false);
          }
        },
        modal: { ondismiss: () => setPaymentLoading(false) },
      });
      checkout.on("payment.failed", (response) => {
        setPaymentMessage(response.error?.description || "Payment did not go through. You can try again or order through WhatsApp.");
        setPaymentLoading(false);
      });
      checkout.open();
    } catch (error) {
      setPaymentMessage(error.message || "Something went wrong while starting payment.");
      setPaymentLoading(false);
    }
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        ✨ Little minds. Big possibilities. Special workbook bundles available!
      </div>

      <header className="navbar">
        <a className="brand" href="#">
          <span className="brand-icon">🌈</span>
          <span><strong>little learners</strong><small>Little steps. Big discoveries.</small></span>
        </a>
        <nav>
          <a href="#shop">Our books</a>
          <a href="#offers">Bundle offers</a>
          <a href="#about">Why us?</a>
        </nav>
        <a className="nav-cart" href="#cart">Your cart <span>{count}</span></a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">MADE FOR LITTLE EXPLORERS</span>
            <h1>Learning can be<span> a little more fun.</span></h1>
            <p>Thoughtfully designed activity workbooks to help children explore, practise and discover something new every day.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#shop">Explore workbooks <span>→</span></a>
              <span className="hero-price-badge"><small>starting at</small><strong>₹{getPrice(1)}</strong></span>
              <span className="hero-note">📚 Printable learning activities</span>
            </div>
            <div className="hero-trust">
              <span>✓ PDF delivery after payment confirmation</span>
              <span>✓ Designed for ages 2–6</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-sun">☀️</div>
            <div className="hero-books">{products.map((product) => <div className="hero-book" key={product.id}><BookCover product={product} /></div>)}</div>
            <div className="floating-note note-one">✏️ Learn by doing!</div>
            <div className="floating-note note-two">💛 Made for curious minds</div>
          </div>
        </section>

        <section className="benefits">
          <div><span>🎨</span><strong>Fun activities</strong><small>Learning through play</small></div>
          <div><span>🧠</span><strong>Growing skills</strong><small>Practice at their pace</small></div>
          <div><span>🏡</span><strong>Learn anywhere</strong><small>Print and get started</small></div>
          <div><span>💛</span><strong>Made with care</strong><small>For little learners</small></div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <span className="eyebrow">THE LITTLE LEARNERS COLLECTION</span>
            <h2>Find their next favourite activity.</h2>
            <p>Three thoughtfully created workbooks. So many little discoveries.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => {
              const isSelected = selected.includes(product.id);
              return (
                <article
                  className={`product-card ${isSelected ? "selected" : ""}`}
                  key={product.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${product.name}`}
                  onClick={() => setActiveProduct(product)}
                  onKeyDown={(event) => {
                    if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      setActiveProduct(product);
                    }
                  }}
                >
                  <div className="product-image">
                    <BookCover product={product} />
                    <span className="age-tag">{product.age}</span>
                    <span className="view-details-hint">View book <span>↗</span></span>
                  </div>
                  <div className="product-info">
                    <div className="product-meta">{product.pages} <span>•</span> Digital workbook</div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <ul>{product.details.map((detail) => <li key={detail}>✓ {detail}</li>)}</ul>
                    <div className="product-footer">
                      <div className="product-price"><strong>₹149</strong><small>One-time purchase</small></div>
                      <button
                        className={isSelected ? "remove-button" : "add-button"}
                        onClick={(event) => { event.stopPropagation(); toggleProduct(product.id); }}
                      >{isSelected ? "✓ Added" : "Add to cart +"}</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="offers-section" id="offers">
          <div className="section-heading">
            <span className="eyebrow">A LITTLE MORE FOR LESS</span>
            <h2>More learning. Bigger savings!</h2>
            <p>Choose more workbooks and enjoy a special bundle price.</p>
          </div>
          <div className="offer-grid">
            <div className="offer-card offer-two">
              <span className="offer-emoji">📚</span><span className="offer-tag">THE DUO DEAL</span>
              <h3>Pick any 2 workbooks</h3><div className="offer-price">₹250</div><p>Instead of ₹298</p>
              <strong className="saving">You save ₹48</strong>
              <button onClick={() => chooseBundle([1, 2])}>Choose 2 workbooks</button>
            </div>
            <div className="offer-card offer-three">
              <span className="popular-tag">BEST VALUE</span><span className="offer-emoji">🎁</span><span className="offer-tag">THE COMPLETE BUNDLE</span>
              <h3>Get all 3 workbooks</h3><div className="offer-price">₹300</div><p>Instead of ₹447</p>
              <strong className="saving">You save ₹147</strong>
              <button onClick={() => chooseBundle([1, 2, 3])}>Get all 3 workbooks</button>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-art">🌱</div>
          <div><span className="eyebrow">LITTLE STEPS MATTER</span><h2>Every page is a new opportunity to learn.</h2>
            <p>From first pencil strokes to early maths and playful puzzles, Little Learners makes practice feel like play. Print the pages, sit together and celebrate every little achievement.</p>
          </div>
        </section>

        <section className="cart-section" id="cart" ref={cartSectionRef}>
          <div className="cart-card">
            <div className="cart-heading"><div><span className="eyebrow">YOUR LITTLE LEARNERS BAG</span><h2>Your cart</h2></div><span className="cart-count">{count} selected</span></div>
            {count === 0 ? (
              <div className="empty-cart"><span>🛍️</span><h3>Your cart is waiting for a little learning!</h3><p>Add a workbook to get started.</p><a href="#shop">Explore workbooks →</a></div>
            ) : (
              <>
                <div className="cart-items">
                  {products.filter((product) => selected.includes(product.id)).map((product) => (
                    <div className="cart-item" key={product.id}>
                      <span>{product.icon}</span><div><strong>{product.name}</strong><small>Digital workbook</small></div><strong>₹149</strong>
                      <button aria-label={`Remove ${product.name}`} onClick={() => toggleProduct(product.id)}>×</button>
                    </div>
                  ))}
                </div>
                {count < 3 ? (
                  <div className="bundle-upsell" aria-live="polite">
                    <div className="bundle-upsell-topline">
                      <span className="bundle-sparkle">✦</span>
                      <span>{count === 1 ? "THE COMPLETE SET IS THE BEST DEAL" : "YOU'RE ONE BOOK AWAY FROM THE BEST DEAL"}</span>
                      <span className="bundle-best-tag">BEST VALUE</span>
                    </div>
                    <div className="bundle-upsell-main">
                      <div className="bundle-copy">
                        <h3>{count === 1 ? "Make it a set of 3!" : "Add the third book for just ₹50 more!"}</h3>
                        <p>{count === 1 ? "Get all 3 workbooks for ₹300 instead of ₹447." : "Complete the collection and get all 3 workbooks for ₹300 instead of ₹447."}</p>
                      </div>
                      <div className="bundle-price-block">
                        <strong>₹300</strong>
                        <small>for all 3</small>
                      </div>
                    </div>
                    <div className="bundle-progress" aria-label={`${count} of 3 books selected`}>
                      {[1, 2, 3].map((step) => <span key={step} className={step <= count ? "filled" : ""} />)}
                    </div>
                    <div className="bundle-bottom-row">
                      <strong>🎉 Save ₹147 on the complete bundle</strong>
                      <span>{count}/3 selected</span>
                    </div>
                    <div className="bundle-add-list">
                      {products.filter((product) => !selected.includes(product.id)).map((product) => (
                        <div className="bundle-add-item" key={product.id}>
                          <span className={`bundle-mini-cover ${product.theme}`}>{product.icon}</span>
                          <span>{product.name}</span>
                          <button onClick={() => addProduct(product.id)}>+ Add</button>
                        </div>
                      ))}
                    </div>
                    <button className="bundle-complete-button" onClick={() => chooseBundle([1, 2, 3])}>
                      Get all 3 for ₹300 <span>→</span>
                    </button>
                  </div>
                ) : (
                  <div className="bundle-unlocked">
                    <span>🎉</span>
                    <div><strong>You've unlocked our best deal!</strong><small>All 3 workbooks for ₹300 · You save ₹147</small></div>
                    <b>₹300</b>
                  </div>
                )}

                <div className="price-summary">
                  <div><span>Original price</span><span>₹{originalTotal}</span></div>
                  {savings > 0 && <div className="discount-line"><span>Bundle savings</span><span>-₹{savings}</span></div>}
                  <div className="total-line"><strong>Total</strong><strong>₹{total}</strong></div>
                </div>
                <button className="razorpay-button" onClick={payWithRazorpay} disabled={paymentLoading}>
                  {paymentLoading ? "Opening secure checkout…" : <> <span className="secure-icon">🔒</span> Pay ₹{total} securely <span>→</span> </>}
                </button>
                <div className="payment-method-note">UPI · Google Pay · PhonePe · Cards · Net Banking</div>
                <div className="checkout-divider"><span>OR</span></div>
                <button className="whatsapp-button" onClick={orderOnWhatsApp}>Prefer WhatsApp? Talk to us →</button>
                <small className="cart-disclaimer">Secure payments powered by Razorpay. WhatsApp is available if you'd like to speak with us before ordering.</small>
                {paymentMessage && <div className={`payment-feedback ${paymentSuccess ? "payment-success" : "payment-error"}`} role="status">{paymentMessage}{paymentSuccess && <button onClick={() => orderOnWhatsApp(verifiedOrderId)}>Contact us on WhatsApp to receive your PDFs</button>}</div>}
              </>
            )}
          </div>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#"><span className="brand-icon">🌈</span><span><strong>little learners</strong><small>Little steps. Big discoveries.</small></span></a>
        <p>Making little learning moments count. 💛</p>
        <small>© {new Date().getFullYear()} Little Learners. All rights reserved.</small>
      </footer>

      {activeProduct && (
        <ProductDetails
          product={activeProduct}
          isSelected={selected.includes(activeProduct.id)}
          onClose={() => setActiveProduct(null)}
          onToggle={() => toggleProduct(activeProduct.id)}
        />
      )}

      {cartPopup && !successPopup && (
        <CartPopup added={cartPopup} count={count} total={total} onClose={() => setCartPopup(null)} onViewCart={viewCartFromPopup} />
      )}

      {successPopup && (
        <PaymentSuccessPopup order={successPopup} onClose={() => setSuccessPopup(null)} onWhatsApp={() => orderOnWhatsApp(successPopup.orderId)} />
      )}

      {!isCartInView && <a className="floating-cart" href={count > 0 ? "#cart" : "#shop"} aria-label={count > 0 ? `View cart with ${count} workbooks, total ₹${total}` : "Browse workbooks"}>
        <span className="floating-cart-icon">🛍️<i>{count}</i></span>
        <span className="floating-cart-copy"><strong>{count > 0 ? `Your cart · ${count} ${count === 1 ? "book" : "books"}` : "Explore workbooks"}</strong><small>{count > 0 ? `Total ₹${total} · View checkout` : "Find a little learning"}</small></span>
        <span className="floating-cart-arrow">{count > 0 ? "→" : "＋"}</span>
      </a>}
    </div>
  );
}
