import axios from 'axios';
interface User {
  username: string;
  password: string;
  email: string;
  image?: string;
  isAdmin?: true;
}
interface Log {
    password: string;
    email: string;
  }

export const createUser = (user : User) =>
    fetch(`https://swagger.dspthetiptop.fr/api/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'

        }
    })

    export const logUser = (log : Log) =>
    fetch(`https://swagger.dspthetiptop.fr/api/users/login`, {
        method: 'POST',
        body: JSON.stringify(log),
        headers: {
            'content-type': 'application/json'

        }
    })

    export const getUser = async (id) => {
        try {
          const response = await axios.get(`https://swagger.dspthetiptop.fr/api/users/${id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            const userData = response.data;
            console.log(userData);
            return userData;
          } else {
            console.error('La requête a échoué avec le statut :', response.status);
            return null;
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
          throw error;
        }
      };