import { useEffect, useState } from "react";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../services/categoryService";

function AdminCategories() {

    const [categories, setCategories] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const emptyForm = {
        name: "",
        description: ""
    };

    const [formData, setFormData] = useState(emptyForm);


    const loadCategories = async () => {

        try {

            const response = await getCategories();

            setCategories(response.data);

        } catch (error) {

            console.error(error);

            setError("Unable to load categories.");

        }
    };


    useEffect(() => {

        loadCategories();

    }, []);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            if (editingId) {

                await updateCategory(
                    editingId,
                    formData
                );

                setMessage(
                    "Category updated successfully."
                );

            } else {

                await createCategory(formData);

                setMessage(
                    "Category added successfully."
                );

            }

            setFormData(emptyForm);

            setEditingId(null);

            setShowForm(false);

            loadCategories();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data ||
                "Unable to save category."
            );

        }
    };


    const handleEdit = (category) => {

        setEditingId(category.id);

        setFormData({
            name: category.name,
            description: category.description || ""
        });

        setShowForm(true);

        setMessage("");
        setError("");
    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteCategory(id);

            setMessage(
                "Category deleted successfully."
            );

            loadCategories();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data ||
                "Unable to delete category."
            );

        }
    };


    const handleAddNew = () => {

        setEditingId(null);

        setFormData(emptyForm);

        setShowForm(true);

        setMessage("");
        setError("");
    };


    const handleCancel = () => {

        setShowForm(false);

        setEditingId(null);

        setFormData(emptyForm);

    };


    return (

        <div className="admin-categories">

            <div className="admin-products-header">

                <div>

                    <h1>Category Management</h1>

                    <p>
                        Manage grocery product categories.
                    </p>

                </div>

                <button onClick={handleAddNew}>
                    + Add Category
                </button>

            </div>


            {message && (
                <div className="admin-success">
                    {message}
                </div>
            )}


            {error && (
                <div className="admin-error">
                    {error}
                </div>
            )}


            {showForm && (

                <div className="product-form-card">

                    <h2>
                        {editingId
                            ? "Edit Category"
                            : "Add Category"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="name"
                            placeholder="Category Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Category Description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                        />

                        <div className="form-buttons">

                            <button type="submit">

                                {editingId
                                    ? "Update Category"
                                    : "Add Category"}

                            </button>

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}


            <div className="categories-grid">

                {categories.length === 0 ? (

                    <div className="empty-orders">

                        <h3>
                            No categories found
                        </h3>

                    </div>

                ) : (

                    categories.map((category) => (

                        <div
                            className="category-admin-card"
                            key={category.id}
                        >

                            <div className="category-icon">
                                🗂️
                            </div>

                            <h3>
                                {category.name}
                            </h3>

                            <p>
                                {category.description ||
                                    "No description"}
                            </p>

                            <div className="category-actions">

                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        handleEdit(category)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        handleDelete(
                                            category.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default AdminCategories;