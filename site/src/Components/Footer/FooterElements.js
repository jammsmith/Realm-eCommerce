import styled from 'styled-components';
import colours from '../../styles/colours.js';
const { dark, darkFade, light } = colours;

// Outer Containers.
export const FooterOuterWrapper = styled.div`
  background-color: ${dark};
  color: ${light};
  padding: 1rem;
  width: 100%;
`;

export const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* max width is same as max width of image */
  max-width: 414px;
  margin: auto;
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 100%;
  }
`;

// Upper section. includes shop image, CTA links and social icons.
export const FooterTopSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TopSectionInner = styled.div`
  display: flex;
  justify-content: space-between;
  @media (min-width: 1024px) {
    align-self: flex-end;
  }
`;

export const TopSectionLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 1rem 0;
  @media (min-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const CTALink = styled.a`
  color: ${light};
  :active,
  :hover {
    color: ${light};
    text-decoration: underline;
  }
`;

export const GetInTouch = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  @media (min-width: 1024px) {
    padding-top: 0.1rem;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: no-wrap;
  :hover {
    cursor: pointer;
  }
`;

// Lower section. includes customer info links and contact details.
export const FooterBottomSection = styled.div`
  border-top: 1px solid ${light};
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  /* Move to right at laptop and above */
  @media (min-width: 1024px) {
    border-top: none;
    border-left: 1px solid ${light};
    flex-direction: column;
    padding-top: 0;
    padding-left: 1rem;
  }
`;

export const ContactWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  gap: 1rem;
  font-size: 1rem;
  margin-right: 2rem;
`;

export const InfoLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
// End

export const Copyright = styled.h6`
  color: ${darkFade};
  font-size: 0.75rem;
  margin: 0.5rem 0 0 0;
  text-align: center;
`;
