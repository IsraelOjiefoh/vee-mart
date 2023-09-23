import SearchBar from "./components/filter/filter";
import Navbar from "./components/navbar/navbar";
import Products from "./components/products/products";

function App() {
  return (
    <div className="container ">
      <Navbar />
      <SearchBar />
      <Products />
    </div>
  );
}
export default App;
