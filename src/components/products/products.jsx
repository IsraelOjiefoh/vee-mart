import { useState, useEffect } from "react";
import Rating from "../Rating/rating";
import axios from "axios";

const ProductsListing = () => {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setProductsList([]); // Clear existing data
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

  return (
    <div className="min-h-screen flex items-center justify-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-32">
          {productsList.map((product) => (
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
                <Rating rating={product.rating.rate} />
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 ease-in-out flex items-center justify-center">
                <button className="text-white text-lg font-semibold py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 ease-in-out">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsListing;
