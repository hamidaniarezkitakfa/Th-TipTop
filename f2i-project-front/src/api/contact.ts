import axios from 'axios';

interface Contact{
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const createNewsLater = (contact : Contact) => {
    return axios.post('http://localhost:3001/api/contact',contact, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
  };