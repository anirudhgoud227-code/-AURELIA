import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, removeFromCart } from "./store";
import "./Cart.css";
import CouponApply from "./CouponApply";
import SendOrderEmail from "./SendOrderEmail";

function Cart() {
  const cartItems = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();

  let { code, discountper, applied, message } = useSelector((state) => state.coupon);

  // Local discount percent
  const [discount, setDiscount] = useState(0);
  const [customerEmail, setCustomerEmail] = useState("");

  // Helper: currency formatter
  const fmt = (v) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v);

  // Totals
  const allCalculations = useMemo(() =>{const totalAmount = cartItems.reduce(
    (sum, it) => sum + (it.price || 0) * (it.quantity || 1),
    0
  );

  const discountAmount = (totalAmount * discount) / 100;
  const priceAfterDiscount = totalAmount - discountAmount;
  const couponDiscount = (priceAfterDiscount * discountper) / 100;
  const gst = (priceAfterDiscount * 18) / 100;
  const netAmount = priceAfterDiscount + gst - couponDiscount;

  // if you want a separate “grand total” name:
  const grandTotal = netAmount;

  console.log("Cart calculations", {
    discountAmount,
    priceAfterDiscount,
    couponDiscount,
    gst,
    netAmount
  });
  return{discountAmount,priceAfterDiscount,couponDiscount,gst,netAmount};
} )
  
  // UI handlers
  const applyDiscount = (pct) => setDiscount(pct);
  const clearDiscount = () => setDiscount(0);

  const onDecrement = (item) => {
    if ((item.quantity || 0) > 1) {
      dispatch(decrement(item));
    } else {
      dispatch(removeFromCart(item));
    }
  };

  const onIncrement = (item) => {
    dispatch(increment(item));
  };

  const onRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  // Conditional empty cart UI
  if (!cartItems.length) {
    return (
      <div className="cart-container empty">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <a className="continue-btn" href="/">
          Continue shopping
        </a>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart Items</h1>

      <ul className="cart-list" aria-live="polite">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="item-main">
              <div className="item-title">{item.title || item.name || "Product"}</div>
              <div className="item-meta">
                <span className="item-price">{fmt(item.price || 0)}</span>
                <span className="item-unit">{item.unit ? ` • ${item.unit}` : ""}</span>
              </div>
            </div>

            <div className="item-actions">
              <div
                className="qty-controls"
                aria-label={`Quantity for ${item.title || item.name}`}
              >
                <button
                  className="qty-btn"
                  onClick={() => onDecrement(item)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <div className="qty-value" aria-live="polite">
                  {item.quantity}
                </div>

                <button
                  className="qty-btn"
                  onClick={() => onIncrement(item)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="item-ops">
                <button className="remove-btn" onClick={() => onRemove(item)}>
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <div className="summary-left">
          <div className="discount-presets">
            <span>Apply discount:</span>
            <button
              className={`discount-btn ${discount === 10 ? "active" : ""}`}
              onClick={() => applyDiscount(10)}
            >
              10%
            </button>
            <button
              className={`discount-btn ${discount === 20 ? "active" : ""}`}
              onClick={() => applyDiscount(20)}
            >
              20%
            </button>
            <button
              className={`discount-btn ${discount === 30 ? "active" : ""}`}
              onClick={() => applyDiscount(30)}
            >
              30%
            </button>
            <button className="discount-btn clear" onClick={clearDiscount}>
              Clear
            </button>
          </div>
        </div>

        <div className="summary-right" aria-live="polite">
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{fmt(allCalculations.totalAmount)}</strong>
          </div>

          <div className="summary-row">
            <span>Discount ({discount}%)</span>
            <span>- {fmt(allCalculations.discountAmount)}</span>
          </div>

          <div className="summary-row">
            <span>After Discount</span>
            <span>{fmt(allCalculations.priceAfterDiscount)}</span>
          </div>

          <div className="summary-row">
            <span>Coupon Discount ({discountper}%)</span>
            <span>- {fmt(allCalculations.couponDiscount)}</span>
          </div>

          <div className="summary-row">
            <span>GST (18%)</span>
            <span>{fmt(allCalculations.gst)}</span>
          </div>

          <div className="summary-row">
            <CouponApply />
            {message && <p>{message}</p>}
          </div>

          <div className="summary-row total">
            <span>Net Amount</span>
            <strong>{fmt(allCalculations.netAmount)}</strong>
          </div>

          <div className="email-section">
            <h4>Enter Your Email to receive the order details:</h4>
            <input
              type="email"
              placeholder="Enter your email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>

          <SendOrderEmail
            cartItems={cartItems}
            netAmount={allCalculations.netAmount}
            tax={allCalculations.gst}
            totalAmount={allCalculations.grandTotal}
            customerEmail={customerEmail}
          />

          <div className="checkout-wrap">
            <button
              className="checkout-btn"
              onClick={() => alert(`Proceeding to checkout: ${fmt(netAmount)}`)}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
