import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { ArrowRight } from 'lucide-react';
import hello from '../assets/images/hero-glow.webp'

const GetStartedSection = styled.section`
  background-color: #1a1a1a;
  padding: 80px 0;
  color: #ffffff;
`;

const ContentWrapper = styled(Container)`
  max-width: 1200px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Category = styled.h4`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
`;

const MainHeading = styled.h2`
  font-size: 2.5rem;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: #ffffff;
`;

const SubHeading = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #a8b2d1;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const GetStartedButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const StyledArrowRight = styled(ArrowRight)`
  width: 20px;
  height: 20px;
`;

const GetStarted: React.FC = () => {
  return (
    <GetStartedSection>
      <ContentWrapper>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <ImageContainer>
              <img 
                src={hello} 
                alt="Broadcasting Equipment" 
                height="400"
                width="600"
              />
            </ImageContainer>
          </Col>
          <Col lg={6}>
            <div className="ps-lg-4">
              <Category>WHITE PAPER</Category>
              <MainHeading>
                Encoding Best Practices: Leveraging Broadcaster Devices
              </MainHeading>
              <SubHeading>
                Effective, efficient, and reliable streaming starts with sound encoding decisions. 
                In this best practices guide, our video experts point the way for conserving bits, 
                keeping costs down, and striking a balance between high-performance and playback 
                compatibility.
              </SubHeading>
              <GetStartedButton>
                Get Started
                <StyledArrowRight />
              </GetStartedButton>
            </div>
          </Col>
        </Row>
      </ContentWrapper>
    </GetStartedSection>
  );
};

export default GetStarted;