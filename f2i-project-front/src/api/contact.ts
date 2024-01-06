import axios from 'axios';

interface Contact{
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const createNewsLater = (contact : Contact) => {
    return axios.post('https://swagger.dspthetiptop.fr/api/contact',contact, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
  };