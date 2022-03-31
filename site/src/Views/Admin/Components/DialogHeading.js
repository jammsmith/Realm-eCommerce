import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Heading from '../../../Components/Heading.js';
import ActionButton from '../../../Components/ActionButton.js';

const HeadingWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin: 0 1rem;
  justify-content: space-between;
`;

const DialogHeading = ({ heading, closeDialog }) => (
  <HeadingWrapper>
    <div style={{ flex: 1 }}>
      <Heading
        text={heading}
        noSpace
        color='white'
      />
    </div>
    <ActionButton
      text='back to dashboard'
      onClick={closeDialog}
      customStyles={{
        marginTop: '0.5rem',
        color: '#fff',
        borderColor: '#fff'
      }}
    />
  </HeadingWrapper>
);

DialogHeading.propTypes = {
  heading: PropTypes.string.isRequired
};

export default DialogHeading;
