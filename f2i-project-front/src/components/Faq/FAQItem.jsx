import React, { useState } from "react";

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-6 flex flex-col items-center justify-center">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={handleToggle}
        role="button"
        aria-expanded={isOpen}
      >
        <div
          className="p-2 bg-gray-200 rounded-full transition-transform transform hover:bg-gray-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
        >
          <span className="text-lg font-bold text-gray-700">+</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
      </div>
      <div
        style={{
          maxHeight: isOpen ? "1000px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
        className="w-full mt-2 px-6 text-gray-700"
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default FAQItem;
