import axios from 'axios';

interface Email{
    email: string;
}

export const createNewsLater = (email : Email) => {
    return axios.post('https://swagger.dspthetiptop.fr/api/blogs/addSubscriber',email, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
  };