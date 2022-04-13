import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SectionSpacer from '../../../Components/SectionSpacer.js';
import SizingInfo from './Components/SizingInfo.js';
import DeliveryInfo from './Components/DeliveryInfo.js';
import PaymentInfo from './Components/PaymentInfo.js';
import ReturnsInfo from './Components/ReturnsInfo.js';
import PrivacyPolicy from './Components/PrivacyPolicy.js';
import Faq from './Components/Faq.js';

const AccordionWrapper = styled.div`
  margin: 0 1rem;
`;

const CustomerInfo = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionItems = [
    { id: 'sizing-info', title: 'Sizing Info', component: SizingInfo },
    { id: 'payment-info', title: 'Payment Info', component: PaymentInfo },
    { id: 'delivery-info', title: 'Delivery Info', component: DeliveryInfo },
    { id: 'privacy-policy', title: 'Privacy Policy', component: PrivacyPolicy },
    { id: 'returns-info', title: 'Returns Info', component: ReturnsInfo },
    { id: 'faq', title: 'FAQ\'s', component: Faq }
  ];

  return (
    <>
      <SectionSpacer dark spaceBelow />
      <AccordionWrapper>
        {
          accordionItems.map((item, index) => {
            const Component = item.component;
            return (
              <Accordion
                key={index}
                expanded={expanded === item.id}
                onChange={handleChange(item.id)}
                sx={{
                  backgroundColor: 'transparent',
                  padding: '1rem',
                  margin: '1rem'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={item.id}
                  id={item.id}
                >
                  <Typography
                    sx={{
                      width: '150px'
                    }}
                  >
                    {item.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Component />
                </AccordionDetails>
              </Accordion>
            );
          })
        }
      </AccordionWrapper>
    </>
  );
};

export default CustomerInfo;
