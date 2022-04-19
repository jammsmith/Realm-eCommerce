import React, { useState, useContext } from 'react';
import { Button, Menu, MenuItem, MenuList } from '@mui/material';
import { AiOutlinePound, AiOutlineDollar, AiOutlineEuro, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import colours from '../../styles/colours.js';
import { CurrencyContext } from '../../context/CurrencyContext.js';

const CurrencySelection = () => {
  const { currency, setCurrency } = useContext(CurrencyContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleCurrencySelection = (e, selection) => {
    e.preventDefault();
    setCurrency(selection);
    handleCloseMenu();
  };

  const menuStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
    padding: '0.75rem'
  };

  const icons = {
    GBP: <AiOutlinePound size={30} style={{ color: colours.dark }} />,
    USD: <AiOutlineDollar size={30} style={{ color: colours.dark }} />,
    EUR: <AiOutlineEuro size={30} style={{ color: colours.dark }} />
  };

  return (
    <>
      <Button
        id='currency-selection'
        aria-controls={open ? 'currency-selection' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenMenu}
        endIcon={open
          ? <AiFillCaretUp size={15} style={{ color: colours.dark }} />
          : <AiFillCaretDown size={15} style={{ color: colours.dark }} />}
      >
        {icons[currency]}
      </Button>
      <Menu
        id='currency-selection'
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'currency-selection-button'
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: colours.light,
            borderRadius: '8px'
          }
        }}
      >
        <MenuList sx={menuStyles}>
          <MenuItem onClick={(e) => handleCurrencySelection(e, 'GBP')}>{icons.GBP}&nbsp;British Pounds</MenuItem>
          <MenuItem onClick={(e) => handleCurrencySelection(e, 'USD')}>{icons.USD}&nbsp;US Dollars</MenuItem>
          <MenuItem onClick={(e) => handleCurrencySelection(e, 'EUR')}>{icons.EUR}&nbsp;Euros</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default CurrencySelection;
