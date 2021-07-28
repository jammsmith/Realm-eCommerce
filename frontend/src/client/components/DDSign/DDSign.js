import styled from 'styled-components';

import colours from '../../../styles/colours';

const { light, dark } = colours;

const DDSignContainer = styled.div`
  background: ${light};
  display: flex;
  height: auto;
  justify-content: center;
  text-align: center;
`;

const DDSignText = styled.h4`
  background: ${dark};
  border-radius: 30px;
  color: ${light};
  font-family: revolverregular;
  font-size: 2rem;
  margin: 0.5rem;
  padding: 0.5rem;
  position: relative;
  z-index: 100;
`;

const DDNailHole = styled.div`
background: ${light};
border-radius: 50%;
height: 10px;
width: 10px;
position: absolute;
`;

const DDSign = (props) => {
  return (
    <DDSignContainer>
      <DDSignText>
        <span><DDNailHole style={{ left: '5px', top: '47%' }} /></span>
        <span><DDNailHole style={{ right: '5px', top: '47%' }} /></span>
        {props.text}
      </DDSignText>
    </DDSignContainer>
  );
};

export default DDSign;
