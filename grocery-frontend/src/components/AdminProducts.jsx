import { useEffect, useState } from "react";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../services/productService";
import { getCategories } from "../services/categoryService";

function AdminProducts() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const emptyForm = {
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        categoryId: ""
    };

    const [formData, setFormData] = useState(emptyForm);


    const loadProducts = async () => {

        try {

            const response = await getProducts();

            setProducts(response.data);

        } catch (error) {

            console.error(error);

            setError("Unable to load products.");

        }
    };


    useEffect(() => {

        loadProducts();
        const loadCategories = async () => {

    try {

        const response = await getCategories();

        setCategories(response.data);

    } catch (error) {

        console.error(error);

        setError("Unable to load categories.");

    }
};
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

        const productData = {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            stock: Number(formData.stock),
            imageUrl: formData.imageUrl,
            category: { id: formData.categoryId }
        };

        try {

            if (editingId) {

                await updateProduct(
                    editingId,
                    productData
                );

                setMessage("Product updated successfully.");

            } else {

                await createProduct(productData);

                setMessage("Product added successfully.");

            }

            setFormData(emptyForm);

            setEditingId(null);

            setShowForm(false);

            loadProducts();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data ||
                "Unable to save product."
            );

        }
    };


    const handleEdit = (product) => {

        setEditingId(product.id);

        setFormData({
            name: product.name,
            description: product.description || "",
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl || ""
        });

        setShowForm(true);

        setMessage("");
        setError("");
    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteProduct(id);

            setMessage("Product deleted successfully.");

            loadProducts();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data ||
                "Unable to delete product."
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

        <div className="admin-products">

            <div className="admin-products-header">

                <div>

                    <h1>Product Management</h1>

                    <p>
                        Manage products in your grocery store.
                    </p>

                </div>

                <button onClick={handleAddNew}>
                    + Add Product
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
                            ? "Edit Product"
                            : "Add Product"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />

                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                            required
                        />

                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />

                        <select
    name="categoryId"
    value={formData.categoryId}
    onChange={handleChange}
    required
>
    <option value="">
        Select Category
    </option>

    {categories.map((category) => (

        <option
            key={category.id}
            value={category.id}
        >
            {category.name}
        </option>

    ))}

</select>
                        <div className="form-buttons">

                            <button type="submit">
                                {editingId
                                    ? "Update Product"
                                    : "Add Product"}
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


            <div className="products-table-container">

                <table className="products-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Product</th>

                            <th>Price</th>

                            <th>Stock</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.length === 0 ? (

                            <tr>

                                <td colSpan="5">
                                    No products found.
                                </td>

                            </tr>

                        ) : (

                            products.map((product) => (

                                <tr key={product.id}>

                                    <td>
                                        {product.id}
                                    </td>

                                    <td>

                                        <div className="table-product">

                                            {product.imageUrl && (

                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                />

                                            )}

                                            <div>

                                                <strong>
                                                    {product.name}
                                                </strong>

                                                <small>
                                                    {product.description}
                                                </small>

                                            </div>

                                        </div>

                                    </td>

                                    <td>
                                        ₹{product.price}
                                    </td>

                                    <td>
                                        {product.stock}
                                    </td>

                                    <td className="admin-actions">

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                handleEdit(product)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    product.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

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

export default AdminProducts;