import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SizingInfo from './Components/SizingInfo.js';
import DeliveryInfo from './Components/DeliveryInfo.js';
import PaymentInfo from './Components/PaymentInfo.js';
import ReturnsPolicy from './Components/ReturnsPolicy.js';
import PrivacyPolicy from './Components/PrivacyPolicy.js';
import Faq from './Components/Faq.js';

const AccordionWrapper = styled.div`
  margin: 0 1rem;
`;

const CustomerInfo = () => {
  const [expanded, setExpanded] = useState(false);
  const { state } = useLocation();

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (state && state.type) {
      setExpanded(state.type);

      const { offsetTop } = document.getElementById(state.type);
      window.scroll(0, (offsetTop - 8));
    }
  }, [state]);

  const accordionItems = [
    { id: 'sizing-info', title: 'Sizing Info', component: SizingInfo },
    { id: 'payment-info', title: 'Payment Info', component: PaymentInfo },
    { id: 'delivery-info', title: 'Delivery Info', component: DeliveryInfo },
    { id: 'returns-policy', title: 'Returns Policy', component: ReturnsPolicy },
    { id: 'privacy-policy', title: 'Privacy Policy', component: PrivacyPolicy },
    { id: 'faq', title: 'FAQ\'s', component: Faq }
  ];

  return (
    <>
      <AccordionWrapper>
        {
          accordionItems.map((item, index) => {
            const Component = item.component;
            return (
              <div key={index} id={item.id}>
                <Accordion
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
              </div>
            );
          })
        }
      </AccordionWrapper>
    </>
  );
};

export default CustomerInfo;
