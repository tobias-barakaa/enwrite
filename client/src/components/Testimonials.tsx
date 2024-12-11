import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import image1 from "../assets/images/enwrite.png";
import image2 from "../assets/images/enwrite.png";
import image3 from "../assets/images/enwrite.png";

// Styled Components
const TestimonialWrapper = styled.section`
  background: linear-gradient(145deg, #0b0c1d, #0f1129);
  color: #d1d5db;
  padding: 50px 15%;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff;
`;

const Subheading = styled.p`
  font-size: 1rem;
  color: #a8adb5;
  margin-bottom: 40px;
`;

const TestimonialCard = styled.div<{ height: number }>`
  width: 200px;
  height: ${({ height }) => `${height}px`};
  background-color: #1e2133;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  color: #e4e7eb;
  text-align: left;

  .profile {
    display: flex;
    gap: 10px;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .details {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 0.9rem;
        font-weight: bold;
        color: #ffffff;
      }

      .role {
        font-size: 0.8rem;
        color: #a8adb5;
      }
    }
  }

  .message {
    font-size: 0.85rem;
    color: #c1c5cb;
  }
`;

const testimonials = [
  {
    image: image1,
    name: "@alexdoe",
    role: "Product Manager",
    message: "Eververse has truly transformed our workflow.",
    height: 150,
  },
  {
    image: image2,
    name: "@janesmith",
    role: "Guest",
    message: "Amazing support and features. Highly recommended!",
    height: 200,
  },
  {
    image: image3,
    name: "@michaeljohn",
    role: "Client",
    message: "The best tool we've ever used in our business.",
    height: 140,
  },
  {
    image: image1,
    name: "@sophiebrown",
    role: "Admin",
    message: "An exceptional product that exceeds expectations.",
    height: 300,
  },
  {
    image: image2,
    name: "@robertdoe",
    role: "Guest",
    message: "Great experience! Simple and efficient.",
    height: 250,
  },
  {
    image: image3,
    name: "@lucyanderson",
    role: "Client",
    message: "Easy to use and highly impactful.",
    height: 200,
  },
];

const Testimonial: React.FC = () => {
  return (
    <TestimonialWrapper>
      <Heading>What people are saying</Heading>
      <Subheading>See what others are saying about Eververse.</Subheading>
      <Container>
        <Row className="justify-content-center">
          {testimonials.map((testimonial, index) => (
            <Col key={index} xs="auto" className="d-flex justify-content-center mb-4">
              <TestimonialCard height={testimonial.height}>
                <div className="profile">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div className="details">
                    <div className="name">{testimonial.name}</div>
                    <div className="role">{testimonial.role}</div>
                  </div>
                </div>
                <div className="message">{testimonial.message}</div>
              </TestimonialCard>
            </Col>
          ))}
        </Row>
      </Container>
    </TestimonialWrapper>
  );
};

export default Testimonial;
