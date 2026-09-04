function OrderSuccess({ order, onContinueShopping }) {

    return (

        <section className="order-success">

            <div className="success-card">

                <div className="success-icon">
                    ✓
                </div>

                <h2>Order Placed Successfully!</h2>

                <p>
                    Thank you for shopping with PasumaiCart.
                </p>

                <div className="order-details">

                    <p>
                        Order ID:
                        <strong> #{order.id}</strong>
                    </p>

                    <p>
                        Total:
                        <strong>
                            ₹{order.totalAmount.toFixed(2)}
                        </strong>
                    </p>

                    <p>
                        Status:
                        <strong> {order.status}</strong>
                    </p>

                    <p>
                        Delivery Address:
                        <strong>
                            {" "}{order.shippingAddress}
                        </strong>
                    </p>

                </div>

                <button onClick={onContinueShopping}>
                    Continue Shopping
                </button>

            </div>

        </section>
    );
}

export default OrderSuccess;