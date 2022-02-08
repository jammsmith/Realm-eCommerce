import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem, MenuList } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { LoginIcon } from './NavbarElements';

const MyAccountMenu = ({ currentUser, handleLogout }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleMenuSeletion = async (selection) => {
    if (selection === 'logout') {
      handleLogout();
      history.push('/');
    } else {
      history.push(`/${selection}`);
    }
    handleCloseMenu();
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
              <MenuItem onClick={() => handleMenuSeletion('my-account')}>My Account</MenuItem>
              <MenuItem onClick={() => handleMenuSeletion('logout')}>Logout</MenuItem>
              </MenuList>
            : <MenuList>
              <MenuItem onClick={() => handleMenuSeletion('login')}>Login</MenuItem>
              <MenuItem onClick={() => handleMenuSeletion('login')}>Register</MenuItem>
              </MenuList>
        }
      </Menu>
    </div>
  );
};

MyAccountMenu.propTypes = {
  currentUser: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default MyAccountMenu;
