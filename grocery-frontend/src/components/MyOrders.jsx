import { useEffect, useState } from "react";
import { getUserOrders } from "../services/orderService";

function MyOrders({ user }) {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!user) {
            setLoading(false);
            return;
        }

        getUserOrders(user.id)
            .then((response) => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to load your orders.");
                setLoading(false);
            });

    }, [user]);

    if (loading) {
        return <h2 className="page-message">Loading orders...</h2>;
    }

    if (error) {
        return <h2 className="page-message">{error}</h2>;
    }

    return (
        <section className="orders-section">

            <div className="orders-container">

                <div className="orders-page-heading">
                    <div>
                        <span className="orders-eyebrow">Your account</span>
                        <h2>My Orders</h2>
                        <p>Track your grocery deliveries and revisit every order.</p>
                    </div>
                    <div className="orders-count">
                        <strong>{orders.length}</strong>
                        <span>{orders.length === 1 ? "order" : "orders"}</span>
                    </div>
                </div>

                {orders.length === 0 ? (

                    <div className="empty-orders">
                        <h3>No orders yet</h3>
                        <p>
                            Your orders will appear here after
                            you place an order.
                        </p>
                    </div>

                ) : (

                    <div className="orders-list">

                        {orders.map((order) => (

                            <div
                                className="order-card"
                                key={order.id}
                            >

                                <div className="order-header">

                                    <div>
                                        <h3>
                                            Order #{order.id}
                                        </h3>

                                        <p>
                                            {new Date(
                                                order.orderDate
                                            ).toLocaleString()}
                                        </p>
                                    </div>

                                    <span className="order-label">ORDER DETAILS</span>
                                    <span
                                        className={`order-status ${order.status.toLowerCase()}`}
                                    >
                                        {order.status}
                                    </span>

                                </div>


                                <div className="order-items">

                                    {order.items?.map((item) => (

                                        <div
                                            className="order-item"
                                            key={item.id}
                                        >

                                            <div>

                                                <strong>
                                                    {item.product?.name ||
                                                        "Product"}
                                                </strong>

                                                <span>
                                                    {" "}×{" "}
                                                    {item.quantity}
                                                </span>

                                            </div>

                                            <strong>
                                                ₹{(
                                                    item.price *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </strong>

                                        </div>

                                    ))}

                                </div>


                                <div className="order-footer">

                                    <div className="order-delivery-details">
                                        <span>
                                            Delivery:
                                        </span>

                                        <strong>
                                            {" "}
                                            {order.shippingAddress}
                                        </strong>
                                        <span className="order-phone-label">
                                            Mobile:
                                        </span>
                                        <strong>
                                            {order.mobileNumber || "Not provided"}
                                        </strong>
                                    </div>

                                    <div className="order-actions-container">
                                        <div className="order-total">
                                            Total: ₹
                                            {order.totalAmount.toFixed(2)}
                                        </div>
                                        <div className="order-action-btns">
                                            <button className="btn-secondary btn-sm">View Details</button>
                                            <button className="btn-primary btn-sm">Track Order</button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
}

export default MyOrders;