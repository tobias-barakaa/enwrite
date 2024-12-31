// CustomLayout.tsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { Container, Row, Col, Button } from "react-bootstrap";
import photo1 from '../assets/images/photo1.png';
import photo2 from '../assets/images/photo2.png';
import photo3 from '../assets/images/photo3.png';
import homelayout from '../assets/images/homelayout.png'


// Gradient animation for "friends"
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Container with background color
const CustomLayoutContainer = styled.div`
  background-color: #f6f9fc;
  width: 100%;
  padding: 50px 0;
  height: 70vh;
`;

// Left section styles
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding: 20px;

`;

const Heading = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  color: #101d24;
  margin-bottom: 20px;

  & span {
    background: linear-gradient(90deg, red, blue, purple, black);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${gradientAnimation} 3s infinite;
  }
`;

const Subheading = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const SignupButton = styled(Button)`
  background-color: #101d24;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.4rem;
  margin-top: 1rem;

  &:hover {
    background-color: #0a141a;
  }
`;

// Right section styles
const RightSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainImage = styled.img`
  width: 400px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SmallImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
`;

const TopLeftImage = styled(SmallImage)`
  top: -30px;
  left: -50px;
`;

const TopRightImage = styled(SmallImage)`
  top: -30px;
  right: -50px;
`;

const BottomLeftImage = styled(SmallImage)`
  bottom: -30px;
  left: -50px;
`;

const BottomRightImage = styled(SmallImage)`
  bottom: -30px;
  right: -50px;
`;

const CustomLayout: React.FC = () => {
  return (
    <CustomLayoutContainer>
      <Container>
        <Row className="align-items-center">
          {/* Left Section */}
          <Col md={6}>
            <LeftSection>
              <Heading className="with-friends-heading">
                Plays well <br />with <span>friends</span>
              </Heading>
              <Subheading>
                Postcards is built for collaboration. Invite colleagues to work
                on templates as an editor or viewer with seamless real-time
                updates.
              </Subheading>
              <SignupButton>Let's Start Here</SignupButton>
            </LeftSection>
          </Col>

          {/* Right Section */}
          <Col md={6}>
            <RightSection>
              <MainImage src={homelayout} alt="Main" />
              <TopLeftImage src={photo1} alt="Small 1" />
              <TopRightImage src={photo2} alt="Small 2" />
              <BottomLeftImage src={photo3} alt="Small 3" />
              <BottomRightImage src={photo3} alt="Small 4" />
            </RightSection>
          </Col>
        </Row>
      </Container>
    </CustomLayoutContainer>
  );
};

export default CustomLayout;
