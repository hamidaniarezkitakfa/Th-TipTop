import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    align-items: center;
    height: 30vh;
`;

const ParticipateButtonStyled = styled(Button)`
    && {
        background-color: #2A5738;
        color: white;
        padding: 15px 30px;
        border: none;
        border-radius: 5px;
        font-size: 18px;
        cursor: pointer;
        margin-bottom: 15px;   
    }
`;

const LineBelowButton = styled.div`
    width: 80%;              
    height: 2px;              
    background-color: #FFD700;   
`;

function ParticipateButton() {
    let navigate = useNavigate(); 

  const handleContactClick = () => {
    navigate('/participer'); 
    window.scrollTo(0, 0); 
  };

    return (
        <CenteredContainer>
            <ParticipateButtonStyled variant="contained" color="primary" onClick={handleContactClick}>
                Participer
            </ParticipateButtonStyled>
            <LineBelowButton />  
        </CenteredContainer>
    );
}

export default ParticipateButton;
