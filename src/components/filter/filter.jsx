import  { useState } from "react";

const SearchBar = () => {
  const [selectedOption, setSelectedOption] = useState("All Products");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex items-center bg-gray-200 p-2 rounded">
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow px-2 py-1 rounded bg-white outline-none"
      />
      <select
        value={selectedOption}
        onChange={handleChange}
        className="ml-2 px-2 py-1 rounded bg-white outline-none"
      >
        <option value="All Products">All Products</option>
        <option value="Products">Men</option>
        <option value="Graphics">Women</option>
        <option value="Templates">Tech</option>
        <option value="Plugins">Jwels</option>
      </select>
    </div>
  );
};

export default SearchBar;