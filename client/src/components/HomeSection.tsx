import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Container } from 'react-bootstrap';
import photo1 from '../assets/images/photo1.png';
import photo2 from '../assets/images/photo2.png';
import photo3 from '../assets/images/photo3.png';


const colorChange = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Section = styled.section`
  background-color: white;
  width: 100%;
  padding: 80px 0;
`;

const MainHeading = styled.h3`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #101d24;
  
  span {
    background: linear-gradient(90deg, #FF416C 0%, #FF4B2B 50%, #C13584 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${colorChange} 5s ease infinite;
    display: inline-block;
  }
`;

const SubHeading = styled.p`
  font-size: 1rem;
  color: #545e64;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem auto;
  line-height: 1.6;
`;

const FeatureCard = styled.div`
  width: 300px;
  height: 250px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureImage = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h4`
  font-size: 1.25rem;
  color: #101d24;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 0.95rem;
  color: #545e64;
  line-height: 1.5;
`;

const FeaturesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    image: photo1,
    title: 'Quick Integration',
    description: 'Connect your tools and services in minutes with our simple integration process.'
  },
  {
    image: photo2,
    title: 'Framework Agnostic',
    description: 'Works seamlessly with any framework or technology stack of your choice.'
  },
  {
    image: photo3,
    title: 'Instant Deploy',
    description: 'Deploy your application instantly with our automated deployment system.'
  }
];

const HomeSection: React.FC = () => {
  return (
    <Section>
      <Container>
        <MainHeading>
          Easy setup for your complete <span>stack</span>
        </MainHeading>
        
        <SubHeading>
          Create with any technology or framework, and we make sure that your app is up and running.
        </SubHeading>

        <FeaturesWrapper>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureImage 
                src={feature.image} 
                alt={feature.title}
              />
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesWrapper>
      </Container>
    </Section>
  );
};

export default HomeSection;