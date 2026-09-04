import { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";

function Checkout({ user, onOrderSuccess }) {

    const {
        cartItems,
        cartTotal,
        clearCart
    } = useCart();

    const [address, setAddress] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handlePlaceOrder = async (e) => {

        e.preventDefault();

        if (!user) {
            setError("Please login before placing an order.");
            return;
        }

        if (cartItems.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        if (!address.trim()) {
            setError("Please enter your shipping address.");
            return;
        }

        if (!/^\+?[0-9]{10,15}$/.test(mobileNumber.trim())) {
            setError("Please enter a valid mobile number (10 to 15 digits).");
            return;
        }

        setLoading(true);
        setError("");

        try {

            const orderData = {

                shippingAddress: address,
                mobileNumber: mobileNumber.trim(),

                items: cartItems.map((item) => ({
                    product: {
                        id: item.id
                    },
                    quantity: item.quantity
                }))

            };

            const response = await createOrder(
                user.id,
                orderData
            );

            clearCart();

            onOrderSuccess(response.data);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data ||
                "Unable to place order."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <section className="checkout-section">

            <div className="checkout-container">

                <h2>Checkout</h2>


                <div className="checkout-grid">

                    {/* Address */}

                    <div className="checkout-card">

                        <h3>Delivery Address</h3>

                        <form onSubmit={handlePlaceOrder}>

                            <textarea
                                value={address}
                                onChange={(e) =>
                                    setAddress(e.target.value)
                                }
                                placeholder="Enter your complete delivery address"
                                rows="5"
                                required
                            />

                            <input
                                type="tel"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                placeholder="Enter your mobile number"
                                inputMode="tel"
                                autoComplete="tel"
                                pattern="\+?[0-9]{10,15}"
                                required
                            />

                            {error && (
                                <p className="checkout-error">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Placing Order..."
                                    : "Place Order"}
                            </button>

                        </form>

                    </div>


                    {/* Order Summary */}

                    <div className="checkout-card">

                        <h3>Order Summary</h3>

                        {cartItems.map((item) => (

                            <div
                                className="checkout-item"
                                key={item.id}
                            >

                                <span>
                                    {item.name}
                                    {" × "}
                                    {item.quantity}
                                </span>

                                <strong>
                                    ₹{(
                                        item.price *
                                        item.quantity
                                    ).toFixed(2)}
                                </strong>

                            </div>

                        ))}


                        <div className="checkout-total">

                            <span>Total</span>

                            <strong>
                                ₹{cartTotal.toFixed(2)}
                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Checkout;