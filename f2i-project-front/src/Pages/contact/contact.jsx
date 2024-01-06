import React , {useState} from "react";
import FAQItem from "../../components/Faq/FAQItem";
import Button from "../../components/button";
import Newsletter from "../../components/news";
import Countdown from "../../components/down";
import AcademicWarning from '../../components/academicWarning';
import { createNewsLater  } from '../../api/contact';


function Contact() {

  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
});

const handleSubmit = (e) => {
  e.preventDefault(); // Empêcher le rechargement de la page
  createNewsLater(contact)
      .then(response => {
          // Traiter la réponse ici
          console.log('Message envoyé', response);
      })
      .catch(error => {
          // Traiter l'erreur ici
          console.error('Erreur lors de l\'envoi', error);
      });
  // Réinitialiser le formulaire après l'envoi
  setContact({ name: '', email: '', subject: '', message: '' });
};

const handleChange = (e) => {
  setContact({ ...contact, [e.target.id]: e.target.value });
};

  const faqData = [
    {
      question: "Comment puis-je contacter le support ?",
      answer:
      "Vous pouvez nous contacter via notre formulaire de contact ou en envoyant un email à support@tiptop.com.",
    },
    {
      question: "Où se situe votre entreprise ?",
      answer: "Notre entreprise est située au 18 rue Léon Frot, 75011 Paris.",
    },
  ];

  return (
    <div className="w-full mx-auto mt-10 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden text-gray-800">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <div className="mb-6">
            <h3 className="font-semibold text-xl text-gray-800 mb-2">
              Horaires d’ouverture :
            </h3>
            <p className="text-gray-700">Lundi – Samedi : 10h-12h / 14h-19h</p>
          </div>
          <div className="relative mb-6 lg:mb-0">
            <iframe
              title="Your Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.6475087512383!2d-79.38318448450078!3d43.65348197912151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34b5e705a6e1%3A0xdaed0c5a8f2c5c80!2sCN%20Tower!5e0!3m2!1sen!2sca!4v1644258282092"
              width="100%"
              height="430px"
              style={{
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="lg:w-1/2 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Nous contacter
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Votre nom"
                value={contact.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Votre adresse email"
                value={contact.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Objet
              </label>
              <input
                type="text"
                id="subject"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="L'objet de votre message"
                value={contact.subject}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Votre message
              </label>
              <textarea
                id="message"
                rows="4"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Votre message ici"
                value={contact.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Envoyer un message
            </button>
          </form>
        </div>
      </div>
      <Countdown />
      <Button />
      <div >
      <h2 className="text-2xl font-semibold mb-4 ml-6 sm:ml-24">
  Questions Fréquemment Posées
</h2>
        <div className="container mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg text-gray-800">
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4 hover:text-blue-500">
              <FAQItem question={faq.question} answer={faq.answer} />
            </div>
          ))}
        </div>
      </div>
      <div className=" flex flex-col md:flex-col items-center justify-center my-10">
        <p className="text-lg text-center px-4 mb-4 md:mb-0 md:mr-4">
          Vous n’avez pas trouvé réponse à votre question?
        </p>
        <button className="bg-green-500 px-6 py-3 rounded-full text-white text-lg font-semibold transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Posez-la ici
        </button>
      </div>
      <AcademicWarning />
      <Newsletter />
    </div>
  );
}

export default Contact;
