import { useState } from "react";
import AdminProducts from "./AdminProducts";
import AdminCategories from "./AdminCategories";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";

function AdminDashboard({ user, onNavigate }) {

    const [activeSection, setActiveSection] = useState("dashboard");

    if (!user || user.role !== "ADMIN") {

        return (
            <div className="admin-access-denied">

                <h2>Access Denied</h2>

                <p>
                    You do not have permission to access
                    the admin dashboard.
                </p>

                <button
                    onClick={() => onNavigate("home")}
                >
                    Back to Home
                </button>

            </div>
        );
    }

    return (

        <section className="admin-section">

            <div className="admin-container">

                <aside className="admin-sidebar">

                    <div className="admin-brand">
                        <span className="admin-brand-mark">GS</span>
                        <div>
                            <strong>PasumaiCart</strong>
                            <span>Control center</span>
                        </div>
                    </div>

                    <button
                        className={
                            activeSection === "dashboard"
                                ? "admin-menu active"
                                : "admin-menu"
                        }
                        onClick={() =>
                            setActiveSection("dashboard")
                        }
                    >
                        📊 Dashboard
                    </button>

                    <button
                        className={
                            activeSection === "products"
                                ? "admin-menu active"
                                : "admin-menu"
                        }
                        onClick={() =>
                            setActiveSection("products")
                        }
                    >
                        📦 Products
                    </button>

                    <button
                        className={
                            activeSection === "users"
                                ? "admin-menu active"
                                : "admin-menu"
                        }
                        onClick={() =>
                            setActiveSection("users")
                        }
                    >
                        👥 Users
                    </button>

                    <button
                        className={
                            activeSection === "categories"
                                ? "admin-menu active"
                                : "admin-menu"
                        }
                        onClick={() =>
                            setActiveSection("categories")
                        }
                    >
                        🗂 Categories
                    </button>

                    <button
                        className={
                            activeSection === "orders"
                                ? "admin-menu active"
                                : "admin-menu"
                        }
                        onClick={() =>
                            setActiveSection("orders")
                        }
                    >
                        🛒 Orders
                    </button>

                    <button
                        className="admin-menu"
                        onClick={() =>
                            onNavigate("home")
                        }
                    >
                        🏠 Back to Shop
                    </button>

                </aside>


                <main className="admin-content">

                    {activeSection === "dashboard" && (

                        <div>

                            <div className="admin-page-heading">
                                <div>
                                    <span className="admin-eyebrow">Overview</span>
                                    <h1>Good morning, {user.name}</h1>
                                    <p className="admin-welcome">
                                        Keep your store moving with a quick look at today&apos;s workspace.
                                    </p>
                                </div>
                                <span className="admin-status"><span /> Store online</span>
                            </div>

                            <div className="admin-stats">

                                <div className="stat-card modern-kpi-card">
                                    <div className="kpi-header">
                                        <p>Total Revenue</p>
                                        <span className="stat-icon revenue-icon">💰</span>
                                    </div>
                                    <h3 className="kpi-value">₹1,24,500</h3>
                                    <p className="kpi-trend positive">+12% from last month</p>
                                </div>

                                <div className="stat-card modern-kpi-card">
                                    <div className="kpi-header">
                                        <p>Total Orders</p>
                                        <span className="stat-icon orders-icon">🛒</span>
                                    </div>
                                    <h3 className="kpi-value">1,204</h3>
                                    <button className="kpi-link" onClick={() => setActiveSection("orders")}>View Orders →</button>
                                </div>

                                <div className="stat-card modern-kpi-card">
                                    <div className="kpi-header">
                                        <p>Total Products</p>
                                        <span className="stat-icon products-icon">📦</span>
                                    </div>
                                    <h3 className="kpi-value">342</h3>
                                    <button className="kpi-link" onClick={() => setActiveSection("products")}>View Products →</button>
                                </div>

                                <div className="stat-card modern-kpi-card">
                                    <div className="kpi-header">
                                        <p>Total Customers</p>
                                        <span className="stat-icon users-icon">👥</span>
                                    </div>
                                    <h3 className="kpi-value">856</h3>
                                    <button className="kpi-link" onClick={() => setActiveSection("users")}>View Users →</button>
                                </div>

                            </div>

                            <div className="admin-overview-grid">
                                <div className="admin-panel admin-panel-featured">
                                    <span className="admin-eyebrow">Quick start</span>
                                    <h2>What needs your attention?</h2>
                                    <p>Jump into your catalog or review incoming orders from the workspace menu.</p>
                                    <button className="admin-primary-action" onClick={() => setActiveSection("products")}>Manage catalog <span>→</span></button>
                                </div>
                                <div className="admin-panel admin-checklist">
                                    <div className="admin-panel-title"><h2>Workspace health</h2><span>Today</span></div>
                                    <div><span className="check-icon">✓</span><p>Storefront is online</p><strong>Ready</strong></div>
                                    <div><span className="check-icon">✓</span><p>Admin access verified</p><strong>Secure</strong></div>
                                </div>
                            </div>

                        </div>

                    )}

                    {activeSection === "products" && (

                        <AdminProducts />

                    )}

                    {activeSection === "users" && (

                        <AdminUsers />

                    )}
                    {activeSection === "categories" && (

                        <AdminCategories />

                    )}

                    {activeSection === "orders" && (

                        <AdminOrders />

                    )}

                </main>

            </div>

        </section>
    );
}

export default AdminDashboard;