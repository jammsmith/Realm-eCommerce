import React, { useState, useContext } from 'react';
import { Button, Menu, MenuItem, MenuList } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import { LoginIcon } from './NavbarElements';
import { RealmAppContext } from '../../realmApolloClient.js';
import { isAuthenticated, isAdmin } from '../../helpers/auth.js';
import colours from '../../styles/colours.js';

const MyAccountMenu = () => {
  const app = useContext(RealmAppContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleMenuSeletion = async (e, selection) => {
    e.preventDefault();
    if (selection === 'logout') {
      await app.logOut();
      handleCloseMenu();
      history.push('/');
    } else {
      handleCloseMenu();
      history.push(`/${selection}`);
    }
  };

  const menuStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem'
  };

  return (
    <div>
      <Button
        id='my-account-button'
        aria-controls={open ? 'my-account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenMenu}
        endIcon={open
          ? <AiFillCaretUp size={15} style={{ color: colours.dark }} />
          : <AiFillCaretDown size={15} style={{ color: colours.dark }} />}
      >
        <LoginIcon size={30} />
      </Button>
      <Menu
        id='my-account-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'my-account-button'
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: colours.light,
            borderRadius: '8px',
            padding: '0.5rem 1rem'
          }
        }}
      >
        {
          app.currentUser && isAuthenticated(app.currentUser)
            ? <MenuList sx={menuStyles}>
              <MenuItem>{app.currentUser.dbUser.email}</MenuItem>
              <MenuItem divider />
              {
                isAdmin(app.currentUser) &&
                  <MenuItem onClick={(e) => handleMenuSeletion(e, 'admin')}>Admin Dashboard</MenuItem>
              }
              <MenuItem onClick={(e) => handleMenuSeletion(e, 'my-account')}>My Account</MenuItem>
              <MenuItem onClick={(e) => handleMenuSeletion(e, 'logout')}>Logout</MenuItem>
              </MenuList>
            : <MenuList sx={menuStyles}>
              <MenuItem onClick={(e) => handleMenuSeletion(e, 'login')}>Login</MenuItem>
              <MenuItem onClick={(e) => handleMenuSeletion(e, 'login')}>Register</MenuItem>
              </MenuList>
        }
      </Menu>
    </div>
  );
};

export default MyAccountMenu;
