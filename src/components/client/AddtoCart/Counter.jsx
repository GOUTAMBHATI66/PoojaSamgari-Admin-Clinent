import React, { useEffect, useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

const Counter = ({ id, initialQuantity, handleQuantityChange }) => {
  const [count, setCount] = useState(initialQuantity || 1);

  // Increment function
  const increment = () => {
    if (count < 5) {
      const newCount = count + 1;
      setCount(newCount);
      handleQuantityChange(id, newCount);
    }
  };

  // Decrement function
  const decrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      handleQuantityChange(id, newCount);
    }
  };

  // Handle manual input
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 5) {
      setCount(value);
      handleQuantityChange(id, value);
    } else if (e.target.value === "") {
      setCount(""); 
    }
  };

  return (
    <div className="flex items-center justify-between md:w-32 w-24 px-2 border rounded-3xl">
      {/* Decrement Button */}
      <button
        onClick={decrement}
        className="text-xl hover:text-muted-foreground focus:outline-none py-1.5"
      >
        <FaMinus size={16} className={`${count <= 1 ? "text-gray-300" : ""}`} />
      </button>

      {/* Counter Input */}
      <input
        type="text"
        value={count}
        onChange={handleInputChange}
        className="w-8 text-center text-lg font-semibold hover:text-muted-foreground bg-transparent outline-none"
      />

      {/* Increment Button */}
      <button
        onClick={increment}
        className="text-lg hover:text-muted-foreground focus:outline-none py-1.5"
      >
        <FaPlus size={15} className={`${count >= 5 ? "text-gray-300" : ""}`} />
      </button>
    </div>
  );
};

export default Counter;
