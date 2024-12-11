import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import yougo from '../assets/images/49146-removebg-preview.png';
import youcome from '../assets/images/arrows-removebg-preview.png';
import lamp from '../assets/images/desk-lamp-removebg-preview.png';



// Styled Components
const ServicesSection = styled.section`
  background: linear-gradient(45deg, #0a192f, #112240);
  padding: 80px 0;
  color: #ffffff;
`;

const ContentWrapper = styled.div`
  padding: 0 15%;
  text-align: center;
`;

const MainHeading = styled.h3`
  font-size: 2.5rem;
  line-height: 1.4;
  margin-bottom: 1.5rem;
  font-weight: 600;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const SubHeading = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: #a8b2d1;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ServiceCard = styled.div<{ width?: string }>`
  width: ${props => props.width || '350px'};
  height: 450px;
  border: 1px solid rgba(255, 255, 255, 0.8); // Made border more visible
  border-radius: 8px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const ServiceDescription = styled.p`
  color: #a8b2d1;
  line-height: 1.6;
`;

// Custom styled Row component to reduce gap between cards
const StyledRow = styled(Row)`
  margin-right: -10px;
  margin-left: -10px;
  
  > div {
    padding-right: 10px;
    padding-left: 10px;
  }
`;

const Services: React.FC = () => {
  const services = [
    {
      image: yougo,
      title: "Advanced Analytics",
      description: "Get deep insights into your video performance with our advanced analytics tools. Monitor engagement, track viewer behavior, and optimize your content strategy.",
      width: "350px"
    },
    {
      image: youcome,
      title: "Cloud Storage",
      description: "Secure and scalable cloud storage solutions for your video content. Access your files anywhere, anytime.",
      width: "200px"
    },
    {
      image: lamp,
      title: "Content Delivery",
      description: "Global content delivery network ensuring smooth playback and minimal latency for viewers worldwide.",
      width: "200px"
    }
  ];

  return (
    <ServicesSection>
      <ContentWrapper>
        <MainHeading>
          Performance, control, and agility, designed for your video requirements
        </MainHeading>
        <SubHeading>
          Transform your video content with our cutting-edge solutions. 
          We provide the tools and infrastructure you need to deliver 
          high-quality video experiences to your audience.
        </SubHeading>
        <Container>
          <StyledRow className="justify-content-center align-items-stretch">
            {services.map((service, index) => (
              <Col key={index} className="mb-4 d-flex justify-content-center">
                <ServiceCard width={service.width}>
                  <ServiceImage src={service.image} alt={service.title} />
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                </ServiceCard>
              </Col>
            ))}
          </StyledRow>
        </Container>
      </ContentWrapper>
    </ServicesSection>
  );
};

export default Services;