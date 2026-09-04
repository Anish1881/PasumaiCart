import ProductCard from "../components/ProductCard";
import { useState } from "react";

function Products({
	products,
	categories,
	selectedCategory,
	onCategoryChange,
	onAddToCart
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState("featured");

	const categoryProducts = selectedCategory === "ALL"
		? products
		: products.filter(
			(product) => product.category?.id === Number(selectedCategory)
		);

	const searchedProducts = categoryProducts.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const filteredProducts = [...searchedProducts].sort((first, second) => {
		if (sortOrder === "price-low") return first.price - second.price;
		if (sortOrder === "price-high") return second.price - first.price;
		return 0;
	});

	return (
		<section className="products-section" id="products">

			<div className="catalog-intro">
				<div>
					<span className="section-kicker">The grocery aisle</span>
					<h2>Good food starts here</h2>
					<p>Explore our everyday essentials and add your favourites to the basket.</p>
				</div>
				<div className="catalog-count">
					<strong>{filteredProducts.length}</strong>
					<span>{filteredProducts.length === 1 ? "item" : "items"} ready to shop</span>
				</div>
			</div>

			<div className="product-page-banner">
				<div>
					<span className="section-kicker">Your daily essentials</span>
					<h3>Stock up on good things.</h3>
					<p>From breakfast basics to evening snacks, keep your kitchen ready.</p>
				</div>
				<div className="catalog-highlights">
					<span><strong>Fresh</strong> picks</span>
					<span><strong>Easy</strong> checkout</span>
					<span><strong>Trusted</strong> quality</span>
				</div>
			</div>

			<div className="catalog-tools">
				<label className="catalog-search">
					<span>Search products</span>
					<input
						type="search"
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
						placeholder="Search by name"
					/>
				</label>

				<label className="catalog-sort">
					<span>Sort by</span>
					<select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
						<option value="featured">Featured</option>
						<option value="price-low">Price: low to high</option>
						<option value="price-high">Price: high to low</option>
					</select>
				</label>
			</div>

			<div className="category-filter">

				<button
					className={selectedCategory === "ALL"
						? "category-filter-button active"
						: "category-filter-button"}
					onClick={() => onCategoryChange("ALL")}
				>
					All
				</button>

				{categories.map((category) => (
					<button
						key={category.id}
						className={selectedCategory === String(category.id)
							? "category-filter-button active"
							: "category-filter-button"}
						onClick={() => onCategoryChange(String(category.id))}
					>
						{category.name}
					</button>
				))}

			</div>

			<div className="products-grid">
				{filteredProducts.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onAddToCart={onAddToCart}
					/>
				))}
			</div>

			{filteredProducts.length === 0 && (
				<div className="no-products">
					<h3>No products found</h3>
					<p>There are no products in this category.</p>
				</div>
			)}

			<div className="catalog-note">
				<div>
					<span className="section-kicker">A better basket</span>
					<h3>Plan the week in one place.</h3>
				</div>
				<p>Keep browsing, add what you need, and review everything together from your cart.</p>
			</div>

		</section>
	);
}

export default Products;
