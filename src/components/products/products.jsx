import { useState, useEffect } from "react";
import axios from "axios";
import Rating from "../Rating/rating";

const ProductsListing = () => {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading]=useState(true)

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const fetchedData = response.data;
        console.log(fetchedData);
        setProductsList(fetchedData);
        setIsLoading(false);

        // Log ratingsArray for debugging
      
      })
      .catch((err) => console.log("Failed to fetch", err));
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Unable to fetch</p>
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
                {/* Add more product details or descriptions here */}
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
    </>
  );
};
export default ProductsListing;
