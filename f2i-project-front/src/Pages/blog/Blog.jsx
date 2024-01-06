import React, { useEffect, useState } from "react";
import Card from "../../components/card/card";
import first from "../../assets/ekaterina-kasimova-6w5HiFoSruA-unsplash (2).png";
import second from "../../assets/lisa-hobbs-mRaNok_Ld6s-unsplash.png";
import third from "../../assets/teacora-rooibos-RKDP3D-6G5E-unsplash.png";
import { Link } from "react-router-dom";
import Button from "../../components/button";
import Newsletter from "../../components/news"
import Countdown from "../../components/down"
import AcademicWarning from '../../components/academicWarning';

const Blog = () => {
  const paragraph =
    "Découvrez les racines profondes et mystérieuses du thé dans ce voyage captivant à travers l'histoire. Explorez les légendes anciennes, les premières découvertes et les routes commerciales qui ont contribué à répandre cette boisson délicieuse à travers le monde. De la Chine antique à l'Occident moderne ";
  return (
    <div>
      <section className="container my-10 mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card
          imageSrc={first}
          text="Le Thé et la Santé ..."
          paragraph={paragraph}
        />
        <Card imageSrc={second} text="Card 2 Text" paragraph={paragraph} />
        <Card imageSrc={third} text="Card 3 Text" paragraph={paragraph} />
      </section>

      {/* <div className="container mx-auto my-10 flex flex-col justify-center items-center gap-3 text-white text-center">
        <button className="bg-green-500 rounded-full border-none py-2 px-6 md:px-20 text-xl md:text-3xl transition duration-300 hover:bg-green-600">
          Participer
        </button>
        <span className="block bg-orange-400 h-1 w-1/4 md:w-1/2 rounded-full"></span>
      </div> */}
      <Countdown />
      <Button />
      <section className="container my-10 mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card
          imageSrc={first}
          text="Le Thé et la Santé ..."
          paragraph={paragraph}
        />
        <Card imageSrc={second} text="Card 2 Text" paragraph={paragraph} />
        <Card imageSrc={third} text="Card 3 Text" paragraph={paragraph} />
      </section>
      {/* <section className="container mx-auto my-10 flex flex-col justify-center items-center gap-5 bg-zinc-700 p-8 rounded-lg text-white text-center">
        <h3 className="text-2xl font-semibold">Restez à l’écoute !</h3>
        <span className="text-center px-4">
          "Restez informé et profitez d'avantages exclusifs en vous inscrivant à
          notre newsletter !"
        </span>
        <div className="flex flex-col md:flex-row items-center mt-4 gap-3">
          <input
            type="text"
            placeholder="Entrez votre e-mail"
            className="px-9 py-2 rounded-full focus:outline-none"
          />
          <button className="bg-green-500 px-4 py-2 rounded-full text-white transition duration-300 hover:bg-green-600">
            S'abonner
          </button>
        </div>
      </section> */}
      <AcademicWarning />
      <Newsletter />
    </div>
  );
};

export default Blog;
