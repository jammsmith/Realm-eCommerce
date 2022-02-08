import React, { useState } from 'react';
import { Button, Menu, MenuItem, MenuList } from '@mui/material';

import { LoginIcon, NavbarLink } from './NavbarElements';

const MyAccountMenu = ({ handleOpenLoginDialog, currentUser, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleMenuSelection = (selection) => {
    switch (selection) {
      case 'my-account':
        handleCloseMenu();
        break;
      case 'login':
      case 'register':
        handleOpenLoginDialog();
        handleCloseMenu();
        break;
      case ('logout'):
        handleLogout();
        handleCloseMenu();
        break;
      default:
    }
  };

  return (
    <div>
      <Button
        id='my-account-button'
        aria-controls={open ? 'my-account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenMenu}
      >
        <LoginIcon size={25} />
      </Button>
      <Menu
        id='my-account-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'my-account-button'
        }}
      >
        {
          currentUser && currentUser.dbUser
            ? <MenuList>
              <MenuItem>{currentUser.dbUser.email}</MenuItem>
              <MenuItem divider />
              <NavbarLink to='/my-account'>
                <MenuItem onClick={() => handleMenuSelection('my-account')}>My Account</MenuItem>
              </NavbarLink>
              <MenuItem onClick={() => handleMenuSelection('logout')}>Logout</MenuItem>
              </MenuList>
            : <MenuList>
              <MenuItem onClick={() => handleMenuSelection('login')}>Login</MenuItem>
              <MenuItem onClick={() => handleMenuSelection('register')}>Register</MenuItem>
              </MenuList>
        }
      </Menu>
    </div>
  );
};

export default MyAccountMenu;
