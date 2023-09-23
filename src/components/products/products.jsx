import { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const fetchedProducts = response.data;
        console.log(fetchedProducts);
        setProducts(fetchedProducts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto py-4">
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
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          useKeyboardArrows={true}
          autoPlay={true}
          interval={3000}
          stopOnHover={true}
          swipeable={true}
          dynamicHeight={false}
          emulateTouch={true}
          swipeScrollTolerance={10}
          className="my-custom-carousel"
        >
          {products.map((product) => (
            <div key={product.id} className="carousel-slide">
              <img
                src={product.image}
                alt={product.title}
                className="carousel-image"
              />
              <h2 className="carousel-title">{product.title}</h2>
              <p className="carousel-description">${product.price}</p>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Products;
