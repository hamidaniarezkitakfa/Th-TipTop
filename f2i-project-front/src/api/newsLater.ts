import axios from 'axios';

interface Email{
    email: string;
}

export const createNewsLater = (email : Email) => {
    return axios.post('http://localhost:3001/api/blogs/addSubscriber',email, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
  };