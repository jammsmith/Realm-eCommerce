import styled from 'styled-components';
import { IoMail } from 'react-icons/io5';
import { MdPhone } from 'react-icons/md';
import { FaMapSigns } from 'react-icons/fa';

import colours from '../../../styles/colours.js';

export const OuterWrapper = styled.div`
  margin: 0 0.5rem;
`;
export const ContactDetailsWrapper = styled.div`
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding: 1rem;
  -webkit-box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 1024px;
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-evenly;
    margin: 0 auto 2rem;
  }
`;
export const DetailsItem = styled.div`
  display: flex;
  align-items: flex-start;
`;
export const DetailsText = styled.p`
  padding-left: 1rem;
  padding-bottom: 0.25rem;
  justify-self: flex-start;
  overflow: hidden;
`;
export const Spacer = styled.div`
  flex: 1;
`;

export const MailIcon = styled(IoMail)`
  color: ${colours.dark};
  margin-top: 0.25rem;
`;
export const PhoneIcon = styled(MdPhone)`
  color: ${colours.dark};
  margin-top: 0.25rem;
`;
export const AddressIcon = styled(FaMapSigns)`
  color: ${colours.dark};
  margin-top: 0.25rem;
`;
