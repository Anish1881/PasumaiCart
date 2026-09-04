import { useEffect, useState } from "react";
import api from "../services/api";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const emptyForm = { name: "", email: "" };
    const [formData, setFormData] = useState(emptyForm);

    const loadUsers = async () => {
        try {
            const response = await api.get("/api/users");
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Unable to load users. Make sure you are logged in as Admin.");
            setLoading(false);
        }
    };

    useEffect(() => { loadUsers(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); setError("");
        try {
            await api.put(`/api/users/${editingId}`, formData);
            setMessage("User updated successfully.");
            setFormData(emptyForm);
            setEditingId(null);
            setShowForm(false);
            loadUsers();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to save user.");
        }
    };

    const handleEdit = (user) => {
        setEditingId(user.id);
        setFormData({ name: user.name, email: user.email });
        setShowForm(true);
        setMessage(""); setError("");
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await api.delete(`/api/users/${id}`);
            setMessage("User deleted successfully.");
            loadUsers();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to delete user.");
        }
    };

    const handleCancel = () => {
        setShowForm(false); setEditingId(null); setFormData(emptyForm);
    };

    if (loading) return <div className="page-message">Loading users...</div>;

    return (
        <div className="admin-products">
            <div className="admin-products-header">
                <div>
                    <h1>User Management</h1>
                    <p>View, edit, and delete customer accounts.</p>
                </div>
            </div>

            {message && <div className="admin-success">{message}</div>}
            {error && <div className="admin-error">{error}</div>}

            {showForm && (
                <div className="product-form-card">
                    <h2>Edit User</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Full Name"
                            value={formData.name} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email Address"
                            value={formData.email} onChange={handleChange} required />
                        <div className="form-buttons">
                            <button type="submit">Update User</button>
                            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="products-table-container">
                <table className="products-table users-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr><td colSpan="5">No users found.</td></tr>
                        ) : (
                            users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td><strong>{u.name}</strong></td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span style={{
                                            background: u.role === "ADMIN" ? "#ff6b35" : "#4caf50",
                                            color: "white", padding: "2px 8px",
                                            borderRadius: "12px", fontSize: "12px"
                                        }}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="admin-actions">
                                        <button className="edit-button" onClick={() => handleEdit(u)}>Edit</button>
                                        {u.role !== "ADMIN" && (
                                            <button className="delete-button" onClick={() => handleDelete(u.id)}>Delete</button>
                                        )}
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

export default AdminUsers;
