import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-6 w-full">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={handleToggle}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <div
          className="p-2 bg-gray-200 rounded-full transition-transform hover:bg-gray-300"
          style={{ transform: isOpen ? "rotate(90deg)" : "none" }}
        >
          {isOpen ? (
            <FaMinus className="text-lg text-gray-700" />
          ) : (
            <FaPlus className="text-lg text-gray-700" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
      </div>

      <div
        style={{
          maxHeight: isOpen ? "1000px" : "0",
          overflow: "hidden",
          transition: "max-height 0.5s ease",
          marginTop: "1rem",
        }}
        className="text-gray-700"
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default FAQItem;