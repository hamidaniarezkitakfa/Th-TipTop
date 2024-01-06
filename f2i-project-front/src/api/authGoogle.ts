import axios from 'axios';

export const getUser = async () => {
    try {
      const response = await axios.get(`https://swagger.dspthetiptop.fr/api/users/google`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
     if (response.status === 200) {

       }
  
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
      throw error;
    }
  };