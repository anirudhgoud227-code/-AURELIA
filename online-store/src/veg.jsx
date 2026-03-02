import React, { useState, useEffect } from "react";
import "./Veg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./store";

export default function Veg() {
  const PRODUCTS = [
    { id: "v1", title: "Paneer Butter Masala", price: 6.99, unit: "300 g", rating: 4.8, img: "panner.png", description: "Soft paneer cubes simmered in a rich buttery tomato gravy." },
    { id: "v2", title: "Veg Biryani", price: 5.49, unit: "full plate", rating: 4.7, img: "vegbiryani.jpeg", description: "Aromatic basmati rice mixed with vegetables and masala." },
    { id: "v3", title: "Mushroom Curry", price: 5.99, unit: "250 g", rating: 4.6, img: "mushroom.jpeg", description: "Creamy curry with fresh mushrooms cooked in mild spices." },
    { id: "v4", title: "Palak Paneer", price: 6.49, unit: "300 g", rating: 4.7, img: "palakpanner.jpeg", description: "Healthy spinach gravy blended with soft paneer cubes." },
    { id: "v5", title: "Mix Veg Curry", price: 4.99, unit: "300 g", rating: 4.5, img: "mixedveg.jpeg", description: "Fresh vegetables cooked in a flavorful Indian gravy." },
    { id: "v6", title: "Chole Masala", price: 5.49, unit: "320 g", rating: 4.6, img: "chole.jpeg", description: "Punjabi-style spicy chickpea curry." },
    { id: "v7", title: "Aloo Gobi", price: 4.75, unit: "300 g", rating: 4.5, img: "aloogobi.jpeg", description: "Classic Indian dish of potatoes and cauliflower." },
    { id: "v8", title: "Kadai Paneer", price: 6.25, unit: "300 g", rating: 4.7, img: "kadai.jpeg", description: "Paneer cubes tossed with capsicum and spices." },
    { id: "v9", title: "Jeera Rice", price: 3.49, unit: "350 g", rating: 4.4, img: "jeerarice.jpeg", description: "Aromatic cumin-flavored basmati rice." },
    { id: "v10", title: "Dal Tadka", price: 3.99, unit: "300 g", rating: 4.7, img: "daltadka.jpeg", description: "Yellow lentils tempered with garlic and spices." },
    { id: "v11", title: "Gobi Manchurian", price: 6.15, unit: "330 g", rating: 4.6, img: "gobimanchurian.jpeg", description: "Crispy cauliflower tossed in Indo-Chinese sauce." },
    { id: "v12", title: "Veg Fried Rice", price: 5.25, unit: "400 g", rating: 4.6, img: "friedrice.jpeg", description: "Rice stir-fried with vegetables and soy seasoning." },
    { id: "v13", title: "Veg Momos", price: 4.99, unit: "8 pcs", rating: 4.8, img: "momos.jpeg", description: "Steamed dumplings packed with veggies." },
    { id: "v14", title: "Malai Kofta", price: 6.99, unit: "350 g", rating: 4.7, img: "malaikofta.jpeg", description: "Soft kofta balls served in a creamy gravy." },
    { id: "v15", title: "Rajma Masala", price: 5.49, unit: "330 g", rating: 4.6, img: "rajma.jpeg", description: "North-Indian style kidney bean curry." }
  ];

  const [theme, setTheme] = useState("light"); // 'light' | 'dark'
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = PRODUCTS.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  // direct calculation (no useMemo)
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
      <div className="veg-stars" aria-hidden>
        {Array.from({ length: full }).map((_, i) => <span key={i}>★</span>)}
        {half ? <span key="half">☆</span> : null}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const dispatch = useDispatch();

  return (
    <div className={`veg-page ${theme}`}>
      {/* header */}
      <div className="veg-header">
        <div className="veg-brand">
          <div className="veg-logo">A</div>
          <div className="veg-brand-text">
            <div className="veg-title">AURELIA Veg</div>
            <div className="veg-subtitle">Fresh vegetarian delights</div>
          </div>
        </div>

        <div className="veg-controls">
          <div className="veg-theme-toggle">
            <button className={`veg-theme-btn ${theme === "light" ? "selected" : ""}`} onClick={() => setTheme("light")}>Light</button>
            <button className={`veg-theme-btn ${theme === "dark" ? "selected" : ""}`} onClick={() => setTheme("dark")}>Dark</button>
          </div>

          <div className="veg-page-size">
            <label htmlFor="pageSize" className="small-label">Items per page:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              className="page-size-select"
            >
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="veg-grid">
        {visibleItems.map((p) => (
          <article
            key={p.id}
            className="veg-card"
            onMouseEnter={(e) => e.currentTarget.classList.add("veg-card-hover")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("veg-card-hover")}
          >
            <div className="veg-img-wrap">
              <img className="veg-img" src={p.img} alt={p.title} />
            </div>

            <div className="veg-card-body">
              <div className="veg-product-title">{p.title}</div>

              <div className="veg-meta-row">
                <div className="veg-meta-left">
                  <Stars rating={p.rating} />
                  <div className="veg-unit">{p.unit}</div>
                </div>

                <div className="veg-price-wrap">
                  <div className="veg-price">${p.price.toFixed(2)}</div>
                  <div className="veg-small-strike">${(p.originalPrice || (p.price * 1.4)).toFixed(2)}</div>
                </div>
              </div>

              <p className="veg-desc">{p.description}</p>

              <div className="veg-actions">
                <button
                  className="veg-details-btn"
                  onClick={() => alert(`${p.title}\n\n${p.description}`)}
                >
                  Details
                </button>

                <button
                  className="veg-add-btn"
                  onClick={() => dispatch(addToCart(p))}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* pagination */}
      <div className="veg-pagination">
        <div className="veg-summary">
          Showing {(currentPage - 1) * pageSize + 1} – {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items.
        </div>

        <div className="veg-page-controls" role="navigation" aria-label="Pagination">
          <button className="veg-page-btn" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>« First</button>
          <button className="veg-page-btn" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>‹ Prev</button>

          {pageRange.map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="veg-dots">…</span>
            ) : (
              <button
                key={p}
                className={`veg-page-btn ${p === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(p)}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          <button className="veg-page-btn" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next ›</button>
          <button className="veg-page-btn" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last »</button>
        </div>
      </div>

      <div className="veg-note">Tip: Toggle theme for a different accent color. Click Details to read a short description.</div>
    </div>
  );
}
