import { useState, useEffect } from "react";
import axios from "axios";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  //fetching product data
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

  // Function to handle category selection and update the selectedCategory state
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.category.toLowerCase() === selectedCategory
      )
    : products;

  //Rating Logic
  const renderStars = (rating) => {
    const maxRating = 5; // Assuming ratings are out of 5
    let filledStars = Math.round(rating); // Round to the nearest whole star

    // Add this check to ensure filledStars does not exceed maxRating
    if (filledStars > maxRating) {
      filledStars = maxRating;
    }

    const emptyStars = maxRating - filledStars;
    const starIcons = [];

    // Render filled stars
    for (let i = 0; i < filledStars; i++) {
      starIcons.push(<span key={`star-filled-${i}`}>★</span>); // Unicode star character
    }

    // Render empty stars
    for (let i = 0; i < emptyStars; i++) {
      starIcons.push(<span key={`star-empty-${i}`}>☆</span>); // Unicode empty star character
    }

    return starIcons;
  };

  return (
    //  categories
    <div className="container mx-auto py-4">
      <h1 className="text-2xl text-center pt-10  font-bold">Categories</h1>
      <div className=" flex items-center justify-center bg-gray-200 p-2 rounded my-5 ">
        {/* Category Navigation Buttons */}
        <div className="sm:block flex space-x-4 my-5 ">
          <button
            onClick={() => handleCategoryChange("")}
            className={`${
              selectedCategory === "" ? "bg-blue-600 text-white" : "bg-gray-300"
            } px-2 py-1 rounded`}
          >
            All
          </button>
          <button
            onClick={() => handleCategoryChange("electronics")}
            className={`${
              selectedCategory === "electronics"
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            } px-1 py-1 rounded`}
          >
            Electronics
          </button>
          <button
            onClick={() => handleCategoryChange("men's clothing")}
            className={`${
              selectedCategory === "men's clothing"
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            } px-1 py-1 rounded`}
          >
            Men
          </button>
          <button
            onClick={() => handleCategoryChange("women's clothing")}
            className={`${
              selectedCategory === "women's clothing"
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            } px-1 py-1 rounded`}
          >
            Women
          </button>
          <button
            onClick={() => handleCategoryChange("jewelery")}
            className={`${
              selectedCategory === "jewelery"
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }  px-1 py-1 rounded`}
          >
            Jewelery
          </button>
        </div>
      </div>
      {/* Product Listing */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg "
              />

              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>

              <span className="m-2">
                Rating: {renderStars(product.rating.rate)}
              </span>

              <p className="text-gray-600 m-2">Price: ${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
