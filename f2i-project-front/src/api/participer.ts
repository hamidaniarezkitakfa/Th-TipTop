import axios from 'axios';


export const getTicketInfo = async (ticketNumber, authToken) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/tickets/${ticketNumber}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('La requête a échoué avec le statut :', response.status);
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des informations du ticket :', error);
        throw error;
    }
};

export const updateTicket = async ( ticketId, userId, authToken) => {
    try {


        const url = `http://localhost:3001/api/tickets/${ticketId}/assignUser/${userId}`;

        const response = await axios.patch(url, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('La requête de mise à jour a échoué avec le statut :', response.status);
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du ticket :', error);
        throw error;
    }
};

export const getWin = async (authToken) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/tickets/userHistory`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('La requête a échoué avec le statut :', response.status);
            return null; 
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des gain :', error);
        throw error;
    }
};


export const claimWin = async (gainId, authToken) => {
    try {
      const url = `http://localhost:3001/api/gain/${gainId}`;
      const dateDeRecuperation = new Date().toISOString();
  
      const response = await axios.patch(url, { dateDeRecuperation }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('La requête PATCH a échoué avec le statut :', response.status);
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du gain :', error);
      throw error;
    }
  };
