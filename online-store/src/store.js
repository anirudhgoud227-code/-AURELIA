import { configureStore, createSlice } from '@reduxjs/toolkit';
import Coupons from './Coupons';

const couponSlice = createSlice({
    name: "coupon",
    initialState: { code: "", discountper: 0, applied: false, message: "" },
    reducers: {
        applyCoupon: (state, action) => {
            const enteredCode = action.payload.toUpperCase();
            if (Coupons[enteredCode]) {
                state.code = enteredCode;
                state.discountper = Coupons[enteredCode];
                state.applied = true;
                state.message = `Coupons ${enteredCode} applied! You got ${Coupons[enteredCode]}% off.`;
            } else {
                state.message = "Invalid coupon code.";
            }
        }
    }
});
export const { applyCoupon } = couponSlice.actions;


let cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        
        addToCart: (state, action) => {
            let item = state.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            let index = state.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        increment: (state, action) => {
            let item = state.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            }
        },
        decrement: (state, action) => {
            const index = state.findIndex(i => i.id === action.payload.id);

            if (index !== -1) {
                if (state[index].quantity > 1) {
                state[index].quantity -= 1;
                } else {
                state.splice(index, 1);   // remove item by index
                }
            }
        },
    }
      
    
});


export const { addToCart, removeFromCart, increment, decrement} = cartSlice.actions;
const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        coupon: couponSlice.reducer,
    },
});
export default store;