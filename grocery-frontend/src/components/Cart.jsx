import { useCart } from "../context/CartContext";

function Cart({ onCheckout })  {

    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartTotal
    } = useCart();


    if (cartItems.length === 0) {

        return (
            <section className="cart-section">

                <h2>Your Cart</h2>

                <p className="empty-cart">
                    Your cart is empty.
                </p>

            </section>
        );
    }


    return (

        <section className="cart-section">

            <h2>Your Cart</h2>


            <div className="cart-items">

                {cartItems.map((item) => (

                    <div
                        className="cart-item"
                        key={item.id}
                    >

                        <img
                            src={item.imageUrl}
                            alt={item.name}
                        />


                        <div className="cart-item-info">

                            <h3>{item.name}</h3>

                            <p>
                                ₹{item.price}
                            </p>

                        </div>


                        <div className="quantity-controls">

                            <button
                                onClick={() =>
                                    decreaseQuantity(item.id)
                                }
                            >
                                −
                            </button>

                            <span>
                                {item.quantity}
                            </span>

                            <button
                                onClick={() =>
                                    increaseQuantity(item.id)
                                }
                            >
                                +
                            </button>

                        </div>


                        <div className="item-total">

                            <strong>
                                ₹{(
                                    item.price *
                                    item.quantity
                                ).toFixed(2)}
                            </strong>

                        </div>


                        <button
                            className="remove-button"
                            onClick={() =>
                                removeFromCart(item.id)
                            }
                        >
                            Remove
                        </button>

                    </div>

                ))}

            </div>


            <div className="cart-summary">

                <h3>
                    Total: ₹{cartTotal.toFixed(2)}
                </h3>

                <button
                    className="clear-cart-button"
                    onClick={clearCart}
                >
                    Clear Cart
                </button>

                <button
                    className="checkout-button"
                    onClick={onCheckout}
                >
                    Proceed to Checkout
                </button>

            </div>

        </section>
    );
}

export default Cart;