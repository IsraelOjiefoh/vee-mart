import { useState, useEffect } from "react";
import axios from "axios";
import Rating from "../Rating/rating";
const ProductsListing = () => {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const fetchedData = response.data;
        console.log(fetchedData);
        setProductsList(fetchedData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Failed to fetch", err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const reloadHandler = () => {
    setIsLoading(true);
    setError(null);
    setProductsList([]);
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const fetchedData = response.data;
        console.log(fetchedData);
        setProductsList(fetchedData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Failed to fetch", err);
        setError(err);
        setIsLoading(false);
      });
  };

  const sortProducts = () => {
    if (sortBy === "default") {
      // No sorting selected, return products as-is
      return productsList;
    }

    // Clone the products list to avoid modifying the original array
    const sortedProducts = [...productsList];

    // Sort the products based on the selected sorting option
    if (sortBy === "priceLowToHigh") {
      sortedProducts.sort(
        (productA, productB) => productA.price - productB.price
      );
    } else if (sortBy === "priceHighToLow") {
      sortedProducts.sort(
        (productA, productB) => productB.price - productA.price
      );
    } else if (sortBy === "rating") {
      sortedProducts.sort(
        (productA, productB) => productB.rating.rate - productA.rating.rate
      );
    }

    return sortedProducts;
  };

  const sortedProducts = sortProducts();

  return (
    <div className="min-h-screen flex flex-col items-center">
      {isLoading ? (
        <div className="text-4xl font-bold text-gray-700 animate-pulse">
          Loading Products...
        </div>
      ) : error ? (
        <div className="text-4xl font-bold text-red-500">
          Error fetching data.
          <button
            onClick={reloadHandler}
            className="ml-2 text-blue-500 underline cursor-pointer"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div>
                <label htmlFor="button"  className="text-2xl flex justify-center items-center mt-10">Filter By: </label>
              <div className="mb-4 space-x-2 flex justify-center my-10">
            <button
              onClick={() => setSortBy("default")}
              className={`${
                sortBy === "default"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-600`}
            >
              Default
            </button>
            <button
              onClick={() => setSortBy("priceLowToHigh")}
              className={`${
                sortBy === "priceLowToHigh"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-600`}
            >
              Price Low to High
            </button>
            <button
              onClick={() => setSortBy("priceHighToLow")}
              className={`${
                sortBy === "priceHighToLow"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-600`}
            >
              Price High to Low
            </button>
            <button
              onClick={() => setSortBy("rating")}
              className={`${
                sortBy === "rating"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-600`}
            >
              Rating
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {sortedProducts.map((product) => (
              <div
                className="group bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-gray-600">
                    Price: ${product.price.toFixed(2)}
                  </p>
                  {/* Include your Rating component here */}
                  <Rating rating={product.rating.rate} />
                  {/* Add more product details or descriptions here */}
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 ease-in-out flex items-center justify-center">
                  <button className="text-white text-lg font-semibold py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 ease-in-out">
                    Add to Cart
                  </button>
                </div>{" "}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsListing;
