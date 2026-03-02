import React, { useState } from "react";
import "./Milk.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./store";

/**
 * Milk.jsx (styles moved to Milk.css)
 */

export default function Milk() {
  const PRODUCTS = [
    { id: "m1", title: "Fresh Milk Packet", price: 1.99, unit: "1 L", rating: 4.6, img: "milk.jpg", description: "Pure farmhouse milk, pasteurized and chilled." },
    { id: "m2", title: "Homemade Curd", price: 2.49, unit: "500 g", rating: 4.8, img: "curd.jpg", description: "Thick, tangy curd made from fresh milk." },
    { id: "m3", title: "Creamy Butter", price: 3.25, unit: "250 g", rating: 4.5, img: "butter.jpg", description: "Rich buttery spread, churned for creaminess." },
    { id: "m4", title: "Fresh Paneer", price: 4.5, unit: "250 g", rating: 4.7, img: "cheese.jpg", description: "Soft, freshly pressed paneer — perfect for curries." },
    { id: "m5", title: "Organic Ghee", price: 6.99, unit: "200 g", rating: 4.9, img: "ghee.jpg", description: "Aromatic, clarified butter made from organic cream." },
    { id: "m6", title: "Flavored Yogurt", price: 2.15, unit: "200 g", rating: 4.4, img: "yogurt.jpg", description: "Creamy yogurt with a hint of natural fruit flavor." },
  ];

  const [theme, setTheme] = useState("default"); // 'default' | 'accent'
  const dispatch = useDispatch();

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

  return (
    <div className={`milk-page ${theme === "accent" ? "theme-accent" : "theme-default"}`}>
      <div className="milk-header">
        <div className="milk-brand">
          <div className="milk-logo">A</div>
          <div className="milk-brand-text">
            <div className="milk-title">AURELIA Dairy</div>
            <div className="milk-subtitle">Fresh & organic dairy essentials</div>
          </div>
        </div>

        <div className="milk-controls">
          <div className="milk-theme-toggle">
            <button
              className={`milk-theme-btn ${theme === "default" ? "selected" : ""}`}
              onClick={() => setTheme("default")}
              aria-pressed={theme === "default"}
              title="Default Theme"
            >
              Default
            </button>

            <button
              className={`milk-theme-btn ${theme === "accent" ? "selected accent" : ""}`}
              onClick={() => setTheme("accent")}
              aria-pressed={theme === "accent"}
              title="Accent Theme"
            >
              Accent
            </button>
          </div>
        </div>
      </div>

      <div className="milk-grid">
        {PRODUCTS.map((p) => (
          <article key={p.id} className="milk-card">
            <div className="milk-img-wrap">
              <img className="milk-img" src={p.img} alt={p.title} />
              {p.soldOut && <div className="milk-badge">Sold</div>}
            </div>

            <div className="milk-card-body">
              <div className="milk-product-title">{p.title}</div>

              <div className="milk-meta-row">
                <div className="milk-meta-left">
                  <Stars rating={p.rating} />
                  <div className="milk-unit">{p.unit}</div>
                </div>

                <div className="milk-price-wrap">
                  <div className="milk-price">${p.price.toFixed(2)}</div>
                  <div className="milk-small-strike">${(p.originalPrice || (p.price * 1.4)).toFixed(2)}</div>
                </div>
              </div>

              <p className="milk-desc">{p.description}</p>

              <div className="milk-actions">
                <button
                  className="milk-details-btn"
                  onClick={() => alert(`${p.title}\n\n${p.description}`)}
                >
                  Details
                </button>

                <button
                  className="milk-add-btn"
                  onClick={() => dispatch(addToCart(p))}
                  disabled={p.soldOut}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="milk-tip">
        Tip: Toggle theme for a different accent color. Click Details to read a short description.
      </div>
    </div>
  );
}
