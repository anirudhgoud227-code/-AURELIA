import React, { useState, useEffect } from "react";
import "./NonVeg.css"; // make sure this path matches your project structure
import { useDispatch } from "react-redux";
import { addToCart } from "./store";

/**
 * NonVeg.jsx (styles moved to NonVeg.css)
 */

export default function NonVeg() {
  const PRODUCTS = [
    { id: "n1", title: "Chicken Biryani", price: 7.99, unit: "full plate", rating: 4.8, img: "chickenbiryani.jpeg", description: "Aromatic basmati rice layered with tender chicken and special spices." },
    { id: "n2", title: "Mutton Curry", price: 9.5, unit: "350 g", rating: 4.7, img: "mutton.jpeg", description: "Slow-cooked mutton in a rich, spicy gravy bursting with flavor." },
    { id: "n3", title: "Fish Fry", price: 5.99, unit: "2 pieces", rating: 4.6, img: "fishfry.jpeg", description: "Crispy shallow-fried fish marinated in coastal-style masala." },
    { id: "n4", title: "Chicken 65", price: 6.25, unit: "300 g", rating: 4.5, img: "chicken65.jpeg", description: "Fiery fried chicken tossed with curry leaves and red chili." },
    { id: "n5", title: "Egg Masala", price: 4.5, unit: "2 eggs", rating: 4.4, img: "egg.jpeg", description: "Boiled eggs simmered in a creamy onion-tomato spiced gravy." },

    { id: "n6", title: "Butter Chicken", price: 8.49, unit: "300 g", rating: 4.9, img: "butterchicken.jpeg", description: "Creamy tomato-based curry with soft pieces of chicken." },
    { id: "n7", title: "Prawn Curry", price: 8.99, unit: "300 g", rating: 4.7, img: "prawncurry.jpeg", description: "Coastal-style prawns cooked in tangy coconut gravy." },
    { id: "n8", title: "Tandoori Chicken", price: 7.25, unit: "half", rating: 4.8, img: "tandoorichicken.jpeg", description: "Juicy chicken marinated in yogurt and tandoori spices." },
    { id: "n9", title: "Keema Curry", price: 6.99, unit: "320 g", rating: 4.6, img: "keema.jpeg", description: "Minced meat cooked with peas and aromatic spices." },
    { id: "n10", title: "Fish Curry", price: 6.75, unit: "300 g", rating: 4.5, img: "fishcurry.jpeg", description: "Tangy fish curry made with tamarind and coastal masala." },
    { id: "n11", title: "Prawn Biryani", price: 9.25, unit: "full plate", rating: 4.8, img: "prawnbiryani.jpeg", description: "Biryani layered with juicy prawns and fragrant spices." },
    { id: "n12", title: "Mutton Biryani", price: 10.5, unit: "full plate", rating: 4.9, img: "muttonbiryani.jpeg", description: "Rich biryani with slow-cooked mutton and saffron rice." },
    { id: "n13", title: "Grilled Fish", price: 7.5, unit: "1 piece", rating: 4.6, img: "grilledfish.jpeg", description: "Lightly spiced and grilled fish fillet served hot." },
    { id: "n14", title: "BBQ Chicken", price: 6.75, unit: "300 g", rating: 4.5, img: "bbqchicken.jpeg", description: "Smoky barbecue-flavoured chicken pieces." },
    { id: "n15", title: "Chicken Korma", price: 7.25, unit: "300 g", rating: 4.6, img: "chickenkorma.jpeg", description: "Mild, creamy korma with delicately spiced chicken pieces." },
    { id: "n16", title: "Prawn Fry", price: 7.0, unit: "250 g", rating: 4.6, img: "prawnfry.jpeg", description: "Crispy shallow-fried prawns with a zesty masala." },
    { id: "n17", title: "Chicken Kebab", price: 5.99, unit: "4 pcs", rating: 4.7, img: "chickenkebab.jpeg", description: "Succulent skewered chicken kebabs, well-seasoned and grilled." },
    { id: "n18", title: "Mutton Kebab", price: 6.5, unit: "4 pcs", rating: 4.6, img: "muttonkebab.jpeg", description: "Minced mutton kebabs made with traditional spices." },
    { id: "n19", title: "Chicken Shawarma Roll", price: 5.5, unit: "1 roll", rating: 4.5, img: "shawarmaroll.jpeg", description: "Wrap stuffed with grilled chicken, veggies and sauces." },
    { id: "n20", title: "Shashlik", price: 7.25, unit: "300 g", rating: 4.6, img: "shashlik.jpeg", description: "Skewered chicken and vegetables tossed in a tangy glaze." }
  ];

  const [theme, setTheme] = useState("default"); // 'default' | 'accent'
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = PRODUCTS.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  // Direct calculation (removed useMemo)
  const start = (currentPage - 1) * pageSize;
  const visibleItems = PRODUCTS.slice(start, start + pageSize);

  const getPageRange = (page, last, delta = 2) => {
    const left = Math.max(1, page - delta);
    const right = Math.min(last, page + delta);
    const range = [];
    for (let i = left; i <= right; i++) range.push(i);
    if (left > 1) {
      if (left > 2) range.unshift("...");
      range.unshift(1);
    }
    if (right < last) {
      if (right < last - 1) range.push("...");
      range.push(last);
    }
    return range;
  };
  const pageRange = getPageRange(currentPage, totalPages);

  const Stars = ({ rating }) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return (
      <div className="stars" aria-hidden>
        {Array.from({ length: full }).map((_, i) => <span key={i}>★</span>)}
        {half ? <span key="half">☆</span> : null}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const dispatch = useDispatch();

  return (
    <div className={`nonveg-page ${theme === "accent" ? "theme-accent" : "theme-default"}`}>
      <div className="nv-header">
        <div className="nv-brand">
          <div className="nv-logo">A</div>
          <div className="nv-brand-text">
            <div className="nv-title">AURELIA Non-Veg</div>
            <div className="nv-subtitle">Savory non-veg delights</div>
          </div>
        </div>

        <div className="nv-controls">
          <div className="nv-theme-toggle">
            <button
              className={`nv-theme-btn ${theme === "default" ? "selected" : ""}`}
              onClick={() => setTheme("default")}
              aria-pressed={theme === "default"}
              title="Default Theme"
            >
              Default
            </button>

            <button
              className={`nv-theme-btn ${theme === "accent" ? "selected accent" : ""}`}
              onClick={() => setTheme("accent")}
              aria-pressed={theme === "accent"}
              title="Accent Theme"
            >
              Accent
            </button>
          </div>

          <div className="nv-page-size">
            <label htmlFor="pageSize" className="nv-label">Items per page:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              className="nv-select"
            >
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>
      </div>

      <div className="nv-grid">
        {visibleItems.map((p) => (
          <article key={p.id} className="nv-card">
            <div className="nv-img-wrap">
              <img className="nv-img" src={p.img} alt={p.title} />
            </div>

            <div className="nv-card-body">
              <div className="nv-product-title">{p.title}</div>

              <div className="nv-meta-row">
                <div className="nv-meta-left">
                  <Stars rating={p.rating} />
                  <div className="nv-unit">{p.unit}</div>
                </div>

                <div className="nv-price-wrap">
                  <div className="nv-price">${p.price.toFixed(2)}</div>
                  <div className="nv-small-strike">${(p.originalPrice || (p.price * 1.4)).toFixed(2)}</div>
                </div>
              </div>

              <p className="nv-desc">{p.description}</p>

              <div className="nv-actions">
                <button
                  className="nv-details-btn"
                  onClick={() => alert(`${p.title}\n\n${p.description}`)}
                >
                  Details
                </button>

                <button
                  className="nv-add-btn"
                  onClick={() => dispatch(addToCart(p))}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="nv-pagination">
        <div className="nv-summary">
          Showing {(currentPage - 1) * pageSize + 1} – {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items.
        </div>

        <div className="nv-page-controls" role="navigation" aria-label="Pagination">
          <button className="nv-page-btn" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>« First</button>
          <button className="nv-page-btn" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>‹ Prev</button>

          {pageRange.map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="nv-dots">…</span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`nv-page-btn ${p === currentPage ? "active" : ""}`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          <button className="nv-page-btn" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next ›</button>
          <button className="nv-page-btn" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last »</button>
        </div>
      </div>

      <div className="nv-tip">
        Tip: Toggle theme for a different accent color. Click Details to read a short description.
      </div>
    </div>
  );
}
