import React from 'react';

import Heading from '../../../Components/Headings/Heading.js';
import {
  Wrapper,
  IntroText,
  ServicesList,
  ListItem,
  LeatherIcon,
  TailoringIcon,
  AdjustmentIcon
} from './styledComponents.js';

const Services = () => {
  return (
    <Wrapper>
      <Heading text='Our Services' />

      <IntroText>All of our work is carried out in our small but well equipped workshop in Wales, UK.</IntroText>
      <IntroText>As well as our stock items we also offer a range of high quality bespoke services.  Please get in touch to enquire about any of these.</IntroText>
      <ServicesList>
        <ListItem><LeatherIcon /><div>Old West Leather</div></ListItem>
        <ListItem><TailoringIcon /> Bespoke Tailoring</ListItem>
        <ListItem><AdjustmentIcon /> Fixes and Adjustments</ListItem>
      </ServicesList>
    </Wrapper>
  );
};

export default Services;
