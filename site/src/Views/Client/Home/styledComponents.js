import styled from 'styled-components';
import { GiCowboyHolster, GiSewingString } from 'react-icons/gi';
import { FaTape } from 'react-icons/fa';

import ResponsiveTileWrapper from '../../../Components/Tiles/ResponsiveTileWrapper.js';
import colours from '../../../styles/colours.js';

export const GoToShopWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  @media (min-width: 1025px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

export const ImagesWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin: 0 1rem;
  @media (min-width: 768px) {
    height: 400px;
    flex-direction: row;
  }
`;

export const PrimaryImage = styled.img`
  border-radius: 6px;
  height: auto;
  width: 100%;
  @media (min-width: 768px) {
    height: 100%;
    width: auto;
  }
`;

export const SecondaryImages = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  @media (min-width: 768px) {
    flex-direction: column;
  }
`;

export const SecondaryImage = styled.img`
  border-radius: 6px;
  height: auto;
  width: 48%;
  @media (min-width: 768px) {
    height: 192px;
    width: auto;
  }
`;

export const LargeScreenImageAndButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TertiaryImage = styled.img`
  border-radius: 6px;
  justify-self: flex-start;
  position: relative;
  right: 1rem;
`;

export const HomeBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// 'Services' section
export const Wrapper = styled(ResponsiveTileWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  width: 96%;
  @media (min-width: 768px) {
    max-width: 760px;
  }
  @media (min-width: 1025px) {
    max-width: 985px;
  }
`;
export const Title = styled.h4`
  font-size: 1.5rem;
  @media (min-width: 1025px) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
`;
export const IntroText = styled.p`
  text-align: center;
  font-size: 1.15rem;
`;
export const ServicesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
`;
export const ListItem = styled.div`
  font-size: 1.35rem;
  display: flex;
  gap: 1rem;
  width: 300px;
  margin-top: 0.5rem;
  justify-content: center;
`;
export const LeatherIcon = styled(GiCowboyHolster)`
  font-size: 1.75rem;
  color: colours.dark;
`;
export const TailoringIcon = styled(GiSewingString)`
  font-size: 1.75rem;
  color: colours.dark;
`;
export const AdjustmentIcon = styled(FaTape)`
  font-size: 1.75rem;
  color: ${colours.dark};
`;
