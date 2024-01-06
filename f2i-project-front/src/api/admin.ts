import axios from 'axios';

interface Jeux {
    nomJeux: string;
    dateDebut: Date,
    dateFin: Date,
    nombreDeTicketTotal: number,
    description: string,
    grandLots: number,
    jeuxDetails: [
        {
            nomPrix: string,
            typePrix: string,
            valeurPrix: number,
            nombreTicket: number
        },

    ]
}

export const createJeux = (jeux, authToken) => {
    // Convertir les valeurs numériques en nombres
    const data = {
      ...jeux,
      nombreDeTicketTotal: Number(jeux.nombreDeTicketTotal),
      grandLots: Number(jeux.grandLots),
      jeuxDetails: jeux.jeuxDetails.map(detail => ({
        ...detail,
        valeurPrix: Number(detail.valeurPrix),
        nombreTicket: Number(detail.nombreTicket),
      })),
    };
  
    return axios.post('http://localhost:3001/api/jeux', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });
  };

  export const createTicket = (authToken) => {
    return axios.post('http://localhost:3001/api/tickets/createForStorePurchase',{}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }
    });
  };

export const getUsers = async (authToken) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/users/filtredUsers`, {
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
        console.error('Erreur lors de la récupération des users :', error);
        throw error;
    }
};


export const getJeux = async (authToken) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/jeux`, {
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
        console.error('Erreur lors de la récupération des tickets :', error);
        throw error;
    }
};

export const getTickets = async (authToken) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/tickets/findParticipant`, {
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
        console.error('Erreur lors de la récupération des tickets :', error);
        throw error;
    }
};

