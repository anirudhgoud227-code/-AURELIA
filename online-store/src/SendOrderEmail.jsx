import emailjs from "@emailjs/browser";

function SendOrderEmail({cartItems, netAmount, tax, totalAmount, customerEmail}) {
    const sendEmail = () => {
        let tempateParams = {
            orders: cartItems.map(item=> ({name: item.name, quantity: item.quantity, price: item.price})),
            order_id: Date.now(),
            totalAmount: netAmount.toFixed(2),
            tax: tax.toFixed(2),
            email: customerEmail
        };
        emailjs.send("service_70qzr0p", "template_rdswxs8", tempateParams, "28Bm5BmyHyMFyjNYu")
        .then((response) => {
           alert('SUCCESS!', response.status, response.text);
        })
    }
    return (
        <div className="send-email-section">
            <button onClick={sendEmail}>Send Order Details to Email</button>
        </div>
    );
}
export default SendOrderEmail;