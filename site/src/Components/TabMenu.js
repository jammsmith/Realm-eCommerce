import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from '@mui/material';
import uniqueString from 'unique-string';

import colours from '../styles/colours.js';
import fonts from '../styles/fonts.js';
import useBreakpoints from '../hooks/useBreakpoints.js';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

const TabMenu = ({ items }) => {
  const [value, setValue] = useState(0);
  const { isXs, isSm } = useBreakpoints();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='my account selection'
          textColor='inherit'
          variant={isXs || isSm ? 'fullWidth' : null}
          centered={!!(!isXs && !isSm)}
          sx={{
            'MuiTabs-root': {
              justifyContent: 'center',
              fontFamily: fonts.standard
            },
            '.MuiTabs-indicator': {
              backgroundColor: colours.dark
            },
            '.MuiTabs-centered': {
              gap: '3rem'
            }
          }}
        >
          {
            items.map(item => <Tab key={uniqueString()} label={item.label} />)
          }
        </Tabs>
      </Box>
      {
        items.map((item, index) =>
          <TabPanel key={uniqueString()} value={value} index={index}>
            {item.component}
          </TabPanel>
        )
      }
    </Box>
  );
};

export default TabMenu;