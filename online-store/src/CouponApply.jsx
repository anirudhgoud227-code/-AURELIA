import { useState } from "react";
import { useDispatch } from "react-redux";
import { applyCoupon } from "./store";

function CouponApply() {
    const [input, setInput] = useState("");
    let dispatch = useDispatch(0);
    let handleApply = () => dispatch(applyCoupon(input));
    return (
        <>
            <input type="text" placeholder="Enter coupon" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleApply}>Apply Coupon </button>

        </>
    )
}
export default CouponApply;