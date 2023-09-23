import  { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const fetchedProducts = response.data;
        console.log(fetchedProducts);

        setProducts(fetchedProducts);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products by category
  const filteredData =
    selectedCategory === "All Products"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  // Handle category selection change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="lg:hidden flex items-center justify-center bg-gray-200 p-2 rounded">
        {/* Category Select */}
        <div className="flex items-center">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border rounded-lg px-4 py-1"
          >
            <option value="All Products">All Products</option>
            <option value="men's clothing">Men Clothing</option>
            <option value="women's clothing">Women Clothing</option>
            <option value="electronics">Tech</option>
            <option value="jewelery">Jewelry</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          <p className="ml-2 text-gray-900">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-red-600">
            Failed to load products. Please check your network connection and{" "}
            <button
              onClick={() => window.location.reload()}
              className="underline text-blue-600 hover:text-blue-800"
            >
              refresh
            </button>{" "}
            the page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredData.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
