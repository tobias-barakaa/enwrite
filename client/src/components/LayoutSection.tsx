import React from "react";
import styled, { keyframes } from "styled-components";
import { Row, Col } from "react-bootstrap";

// Animation for the numbers
const colorChange = keyframes`
  0% { color: red; }
  33% { color: black; }
  66% { color: purple; }
  100% { color: red; }
`;

const LayoutSectionWrapper = styled.section`
  background-color: #f6f9fc;
  padding: 50px 20px;
  text-align: center;
  height: 100vh;
  margin-bottom: 4rem;
`;

const Title = styled.h3`
  font-size: 5rem;
  font-weight: 900;
  color: #101d24;
  line-height: 1.2;
  margin-bottom: 20px;
  margin-top: 6pc;
`;

const Subheading = styled.p`
  font-size: 1.4rem;
  color: #545e64;
  line-height: 1.5;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  width: 300px;
  height: 300px;
  background-color: #f6f9fc;
  border: 1px solid rgba(16, 29, 36, 0.1);
  box-shadow: 0px 4px 6px rgba(16, 29, 36, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    color: red;
  }
`;

const StatNumber = styled.div`
  font-size: 5.5rem;
  font-weight: bold;
  animation: ${colorChange} 3s infinite;
`;

const StatDescription = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
`;

const LayoutSection: React.FC = () => {
  return (
    <LayoutSectionWrapper>
      <Title className="title-numbers">The numbers <br />say it all.</Title>
      <Subheading>
        Postcards makes email template design faster. Way faster.<br /> Priced to make sense for every use case.
      </Subheading>
      <Row className="justify-content-center">
        <Col xs="auto">
          <StatCard>
            <StatNumber>7.2hrs</StatNumber>
            <StatDescription>
              saved on average to design<br /> one email template <br />with Postcards.
            </StatDescription>
          </StatCard>
        </Col>
        <Col xs="auto">
          <StatCard>
            <StatNumber>85%</StatNumber>
            <StatDescription>
              fewer clicks to build identical<br /> designs in Postcards vs.<br /> other email builders.
            </StatDescription>
          </StatCard>
        </Col>
        <Col xs="auto">
          <StatCard>
            <StatNumber>0.4%</StatNumber>
            <StatDescription>
              proportion of the average<br /> email designer’s salary <br />spent on Postcards.
            </StatDescription>
          </StatCard>
        </Col>
        <Col xs="auto">
          <StatCard>
            <StatNumber>$100K</StatNumber>
            <StatDescription>
              in design costs saved by one Postcards client over 4 years.
            </StatDescription>
          </StatCard>
        </Col>
      </Row>
    </LayoutSectionWrapper>
  );
};

export default LayoutSection;