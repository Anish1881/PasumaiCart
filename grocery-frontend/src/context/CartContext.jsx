import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    // Get logged-in user
    const getCurrentUser = () => {

        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    };


    const getCartKey = () => {

        const user = getCurrentUser();

        if (!user) {
            return "cart_guest";
        }

        return `cart_${user.id}`;
    };


    // Load cart for current user
    const loadCart = () => {

        const cartKey = getCartKey();

        const savedCart =
            localStorage.getItem(cartKey);

        return savedCart
            ? JSON.parse(savedCart)
            : [];
    };


    const [cartKey, setCartKey] = useState(getCartKey);
    const [cartItems, setCartItems] = useState(() =>
        localStorage.getItem(getCartKey())
            ? JSON.parse(localStorage.getItem(getCartKey()))
            : []
    );


    // Save cart for current user
    useEffect(() => {

        localStorage.setItem(
            cartKey,
            JSON.stringify(cartItems)
        );

    }, [cartItems, cartKey]);


    // Switch to the cart owned by the selected user.
    const switchCart = (userId) => {

        const nextCartKey = userId
            ? `cart_${userId}`
            : "cart_guest";

        const savedCart = localStorage.getItem(nextCartKey);

        setCartKey(nextCartKey);
        setCartItems(savedCart ? JSON.parse(savedCart) : []);
    };


    // Add product
    const addToCart = (product) => {

        setCartItems((currentItems) => {

            const existingItem =
                currentItems.find(
                    (item) => item.id === product.id
                );

            if (existingItem) {

                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity:
                                item.quantity + 1
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    };


    // Increase quantity
    const increaseQuantity = (id) => {

        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity + 1
                    }
                    : item
            )
        );
    };


    // Decrease quantity
    const decreaseQuantity = (id) => {

        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity:
                                item.quantity - 1
                        }
                        : item
                )
                .filter(
                    (item) => item.quantity > 0
                )
        );
    };


    // Remove product
    const removeFromCart = (id) => {

        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== id
            )
        );
    };


    // Clear cart
    const clearCart = () => {

        setCartItems([]);
    };


    // Total quantity
    const cartCount = cartItems.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    // Total price
    const cartTotal = cartItems.reduce(
        (total, item) =>
            total +
            item.price * item.quantity,
        0
    );


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                switchCart,
                cartCount,
                cartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}


export function useCart() {
    return useContext(CartContext);
}