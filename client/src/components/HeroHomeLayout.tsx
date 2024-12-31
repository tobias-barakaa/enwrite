import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "react-bootstrap";
import homelayout from '../assets/images/homelayout.png'

const colorChange = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSection = styled.section`
  background-color: #f6f9fc;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center;    /* Center vertically */
  height: 150vh;          /* Full viewport height */
  flex-direction: column; /* Stack items vertically */
  text-align: center;
  padding: 20px;
`;

const HeroTitle = styled.h1`

  font-size: 5.6rem;
  font-weight: 900;
  color: #101d24;
  line-height: 1.2;
  max-width: 900px;
    

  
  

  & span {
    background: linear-gradient(90deg, red, purple, orange, red);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${colorChange} 3s infinite;
  }
`;

const HeroSubheading = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  color: #545e64;
  margin-bottom: 40px;
  line-height: 1.5;
  max-width: 600px;
`;

const HeroButton = styled(Button)`
  background-color: #0d1d24;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;

  &:hover {
    background-color: #0a1720;
  }
`;

const ImageWrapper = styled.div`
  margin-top: 100px;
  border: 1px solid #101d24;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const HeroHomeLayout: React.FC = () => {
  return (
    <HeroSection>
      <HeroTitle  className="heading-title">
        <span>Bespoke</span> your Writers <br /> game
        with an intuitive <br />
        email builder.
      </HeroTitle>
      <HeroSubheading>
        Create your email templates <br />
        20x faster, with no design limits and no coding skills.
      </HeroSubheading>
      <HeroButton>Get Started</HeroButton>
      <ImageWrapper>
        <img
          src={homelayout}
          alt="Hero Illustration"
          height="1000"
          width="1000"
        />
      </ImageWrapper>
    </HeroSection>
  );
};

export default HeroHomeLayout;
