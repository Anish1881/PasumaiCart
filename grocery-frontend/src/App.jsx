import { useEffect, useState } from "react";
import { getProducts } from "./services/productService";
import { getCategories } from "./services/categoryService";
import Cart from "./components/Cart";
import { useCart } from "./context/CartContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import MyOrders from "./components/MyOrders";
import AdminDashboard from "./components/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const {
        cartItems,
        cartCount,
        addToCart,
        switchCart
    } = useCart();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(() =>
        localStorage.getItem("currentPage") || "welcome"
    );
    const [checkoutOrder, setCheckoutOrder] = useState(null);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
    }, [currentPage]);


    const [user, setUser] = useState(() => {

        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const handleLoginSuccess = (loggedInUser) => {
        switchCart(loggedInUser.id);
        setUser(loggedInUser);
        setCurrentPage("home");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        switchCart(null);
        setCurrentPage("welcome");
    };

    useEffect(() => {

        getProducts()
            .then((response) => {

                setProducts(response.data);

                setLoading(false);

            })
            .catch((error) => {

                console.error(error);

                setError(
                    "Unable to load products"
                );

                setLoading(false);

            });


        getCategories()
            .then((response) => {

                setCategories(response.data);

            })
            .catch((error) => {

                console.error(
                    "Unable to load categories",
                    error
                );

            });

    }, []);

    if (loading) {
        return <h2 className="loading">Loading...</h2>;
    }

    if (error) {
        return <h2 className="error">{error}</h2>;
    }

    if (currentPage === "welcome") {
        return <Welcome onContinue={() => setCurrentPage("login")} />;
    }

    if (currentPage === "about" || currentPage === "contact") {

        return (
            <div className="app">
                <Header user={user} cartCount={cartCount} onNavigate={setCurrentPage} onLogout={handleLogout} activeTab={currentPage} />
                {currentPage === "about"
                    ? <About onNavigate={setCurrentPage} />
                    : <Contact />}
                <Footer onNavigate={setCurrentPage} />
            </div>
        );
    }

    if (currentPage === "login") {

        return (
            <div className="app">
                <Login
                    onRegisterClick={() =>
                        setCurrentPage("register")
                    }
                    onLoginSuccess={handleLoginSuccess}
                />
                <Footer onNavigate={setCurrentPage} />

            </div>
        );
    }

    if (currentPage === "register") {

        return (
            <div className="app">
                <Register
                    onLoginClick={() =>
                        setCurrentPage("login")
                    }
                />
                <Footer onNavigate={setCurrentPage} />

            </div>
        );
        
    }
    
    


    if (currentPage === "checkout") {

        if (!user) {

            setCurrentPage("login");

            return null;
        }

        return (
            <div className="app">
                <Header user={user} cartCount={cartCount} onNavigate={setCurrentPage} onLogout={handleLogout} activeTab={currentPage} />

                <Checkout
                    user={user}
                    onOrderSuccess={(order) => {

                        setCheckoutOrder(order);
                        setCurrentPage("order-success");

                    }}
                />
                <Footer onNavigate={setCurrentPage} />

            </div>
        );
    }


    if (currentPage === "products") {

        return (
            <div className="app">
                <Header user={user} cartCount={cartCount} onNavigate={setCurrentPage} onLogout={handleLogout} activeTab={currentPage} />

                <Products
                    products={products}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    onAddToCart={addToCart}
                />
                <Footer onNavigate={setCurrentPage} />

            </div>
        );
    }


    if (currentPage === "cart") {

        return (
            <div className="app">
                <Header user={user} cartCount={cartCount} onNavigate={setCurrentPage} onLogout={handleLogout} activeTab={currentPage} />

                <Cart
                    onCheckout={() => {

                        if (!user) {
                            setCurrentPage("login");
                        } else {
                            setCurrentPage("checkout");
                        }

                    }}
                />
                <Footer onNavigate={setCurrentPage} />

            </div>
        );
    }


    if (currentPage === "order-success") {

        return (
            <div className="app">
                <Header user={user} cartCount={cartCount} onNavigate={setCurrentPage} onLogout={handleLogout} activeTab={currentPage} />

                <OrderSuccess
                    order={checkoutOrder}
                    onContinueShopping={() => {
                        setCheckoutOrder(null);
                        setCurrentPage("home");
                    }}
                />
                <Footer onNavigate={setCurrentPage} />

            </div>
        );
    }


    if (currentPage === "orders") {

        if (!user) {

            setCurrentPage("login");

            return null;
        }

        return (
            <div className="app">
                <Header user={user} cartCount={cartCount} onNavigate={setCurrentPage} onLogout={handleLogout} activeTab={currentPage} />

                <MyOrders user={user} />
                <Footer onNavigate={setCurrentPage} />

            </div>
        );
    }

    if (currentPage === "admin") {

        return (
            <div className="app">
                <Header user={user} cartCount={cartCount} onNavigate={setCurrentPage} onLogout={handleLogout} activeTab={currentPage} />

                <AdminDashboard
                    user={user}
                    onNavigate={setCurrentPage}
                />
                <Footer onNavigate={setCurrentPage} />

            </div>
        );
    }

    if (currentPage === "home") {
        return (
            <div className="app">
                <Header user={user} cartCount={cartCount} onNavigate={setCurrentPage} onLogout={handleLogout} activeTab={currentPage} />
                <Home
                    categories={categories}
                    products={products}
                    onShopNow={() => setCurrentPage("products")}
                    onAddToCart={addToCart}
                />
                <Footer onNavigate={setCurrentPage} />
            </div>
        );
    }

    return (
        <div className="app">
            <Header user={user} cartCount={cartCount} onNavigate={setCurrentPage} onLogout={handleLogout} activeTab={currentPage} />
            <NotFound onNavigate={setCurrentPage} />
            <Footer onNavigate={setCurrentPage} />
        </div>
    );
}

export default App;