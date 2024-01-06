import { useEffect } from 'react';

const AxeptioConsent = () => {
  useEffect(() => {
    if (window.axeptioSDK) {
      // Initialiser Axeptio avec les options nécessaires
      window.axeptioSDK.on('cookies:complete', function(choices) {
        console.log("L'utilisateur a fait ses choix :", choices);
      });
    }
  }, []);

  return null; // Ce composant n'affiche rien
};

export default AxeptioConsent;