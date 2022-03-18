import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { uploadFile } from 'react-s3';
import styled from 'styled-components';

import { S3_CONFIG } from '../graphql/queries.js';
import ActionButton from './ActionButton.js';
import FileBrowseButton from './FileBrowseButton.js';
import UserMessage from './UserMessage.js';

// Styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  gap: 0.25rem;
`;
const InnerWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

const ImageUploader = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});
  const { data } = useQuery(S3_CONFIG);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    setDisabled(false);
  };

  const handleUpload = async (e, file) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (data && data.getS3Config) {
        const imageUpload = await uploadFile(file, data.getS3Config);
        onUpload(imageUpload.location);
        setMessage({
          type: 'success',
          text: 'Image upload successful!'
        });
        setSelectedFile(null);
      } else {
        setMessage({
          type: 'error',
          text: 'Failed to find S3 credentials'
        });
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'Upload failed. Please try again or contact support if the problem persists'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div>Upload an image</div>
      <InnerWrapper>
        <FileBrowseButton onChange={handleFileInput} />
        <ActionButton
          text='Upload'
          onClick={(e) => handleUpload(e, selectedFile)}
          customStyles={{
            width: '6rem',
            height: '2.5rem'
          }}
          disabled={disabled}
          loading={loading}
        />
      </InnerWrapper>
      {selectedFile && selectedFile.name}
      {message && message.type && <UserMessage type={message.type} text={message.text} />}
    </Wrapper>
  );
};

ImageUploader.propTypes = {
  onUpload: PropTypes.func.isRequired
};

export default ImageUploader;
