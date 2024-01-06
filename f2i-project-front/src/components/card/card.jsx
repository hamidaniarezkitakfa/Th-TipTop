import React from "react";
import { Link } from "react-router-dom";

const Card = ({ imageSrc, text, paragraph }) => {
  return (
    <div className="max-w-sm rounded-lg color overflow-hidden shadow-lg">
      <img className="w-full" src={imageSrc} alt="ThéTipTop avis Card" />
      <div className="px-6 py-4">
        <h2>{text}</h2>
        <p className="text-white-700 text-base">{paragraph}</p>
        <Link>Lire la suite</Link>
      </div>
    </div>
  );
};

export default Card;
