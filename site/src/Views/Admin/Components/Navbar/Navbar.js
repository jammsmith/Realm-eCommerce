import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import ActionButton from '../../../../Components/ActionButton.js';
import { RealmAppContext } from '../../../../realmApolloClient.js';

// Styled components
import { Wrapper, MainText, ButtonsWrapper } from './styledComponents.js';

const buttonStyles = {
  borderColor: '#fff',
  color: '#fff'
};

const Navbar = () => {
  const app = useContext(RealmAppContext);
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();
    await app.logOut();
    history.push('/');
  };

  return (
    <Wrapper>
      <MainText>Doves & Dandys Dashboard</MainText>
      <ButtonsWrapper>
        <ActionButton
          text='view customer site'
          linkTo='/'
          customStyles={buttonStyles}
        />
        <ActionButton
          text='logout'
          onClick={handleLogout}
          customStyles={buttonStyles}
        />
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default Navbar;
