import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../services/orderService";

const STATUS_OPTIONS = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const loadOrders = async () => {
        try {
            const response = await getAllOrders();
            setOrders(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Unable to load orders.");
            setLoading(false);
        }
    };

    useEffect(() => { loadOrders(); }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        setMessage(""); setError("");
        try {
            await updateOrderStatus(orderId, newStatus);
            setMessage(`Order #${orderId} updated to ${newStatus}.`);
            loadOrders();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to update status.");
        }
    };

    if (loading) return <div className="page-message">Loading orders...</div>;

    return (
        <div className="admin-products">
            <div className="admin-products-header">
                <div>
                    <h1>Order Management</h1>
                    <p>View and update customer order statuses.</p>
                </div>
            </div>

            {message && <div className="admin-success">{message}</div>}
            {error && <div className="admin-error">{error}</div>}

            <div className="products-table-container">
                <table className="products-table orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Mobile</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr><td colSpan="8">No orders found.</td></tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td><strong>#{order.id}</strong></td>
                                    <td>
                                        <div><strong>{order.user?.name || "N/A"}</strong></div>
                                        <small>{order.user?.email || ""}</small>
                                    </td>
                                    <td className="order-mobile">
                                        {order.mobileNumber || "Not provided"}
                                    </td>
                                    <td>
                                        {order.items?.map((item) => (
                                            <div key={item.id}>
                                                {item.product?.name} × {item.quantity}
                                            </div>
                                        ))}
                                    </td>
                                    <td><strong>₹{order.totalAmount?.toFixed(2)}</strong></td>
                                    <td style={{ maxWidth: "150px", fontSize: "12px" }}>
                                        {order.shippingAddress}
                                    </td>
                                    <td style={{ fontSize: "12px" }}>
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            style={{
                                                padding: "4px 8px",
                                                borderRadius: "6px",
                                                border: "1px solid #ccc",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {STATUS_OPTIONS.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminOrders;
