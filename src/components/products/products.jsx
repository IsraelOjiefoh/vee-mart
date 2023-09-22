import { useState, useEffect } from "react";
import axios from "axios";
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const fetchedProducts = response.data;
        console.log(fetchedProducts);
        setProducts(fetchedProducts);
      })
      .catch((err) => {
        console.error("Failed to fetch data", err);
      });
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-semibold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover"
            />
            <div className="px-4 py-2">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
