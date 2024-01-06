import React from 'react';
import Slide from './avis/avis'; 

function Testimonials() {


    const testimonialData = [
        {
            id: 1,
            name: "Essaid",
            img: "", 
            review: "Je suis ravi d'avoir découvert The Tip Top, leurs thés biologiques sont d'une qualité exceptionnelle et l'engagement envers l'environnement est réel. Une entreprise à soutenir !",
            rating: 5,
        },
        {
            id: 2,
            name: "Oussama",
            img: "", 
            review: "Thétiptop a conquis mon cœur avec sa gamme diversifiée de thés haut de gamme. Chaque infusion est une escapade sensorielle, offrant une qualité exceptionnelle qui élève véritablement ma pause thé quotidienne.",
            rating: 5,
        },
        {
            id: 3,
            name: "Arezki",
            img: "", 
            review: "La découverte de Thétiptop a été une révélation pour mes papilles. Leurs thés, savamment mélangés, offrent une expérience gustative inégalée. Un pur délice qui a transformé ma façon de savourer le thé.",
            rating: 5,
        },
        {
            id: 4,
            name: "Ibrahim",
            img: "", 
            review: "Thétiptop incarne l'excellence du thé. J'ai été séduit par la fraîcheur et l'authenticité de leurs mélanges. Chaque tasse est une invitation à un voyage gustatif raffiné que je recommande vivement.",
            rating: 5,
        }
    ];

    return (
        <section className="container mt-4">
        <div className="row">
            <Slide data={testimonialData} slidesPerView={3} />
        </div>
    </section>
    );
}

export default Testimonials;
