import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import say from '../assets/images/pen.jpg'

const Section = styled.section`
  background-color: white;
  padding: 80px 0;
  width: 100%;
`;



const MainHeading = styled.h2`
  text-align: center;
  




background: linear-gradient(90deg, #ff4e50, #800000, #101d24, #800080, #101d24);
  background-clip: text;
  font-size: 5rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;




`;

const SubHeading = styled.p`
  font-size: 1.2rem;
  color: #545e64;
  text-align: center;
  margin-bottom: 4rem;
`;

const TestimonialsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

interface CardProps {
  width: number;
  height: number;
}

const TestimonialCard = styled.div<CardProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const Comment = styled.p`
  font-size: 1rem;
  color: #101d24;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: #101d24;
`;

const AuthorTitle = styled.span`
  color: #545e64;
  font-size: 0.9rem;
`;

interface Testimonial {
  comment: string;
  author: string;
  title: string;
  image: string;
  width: number;
  height: number;
}

const testimonials: Testimonial[] = [
  // First row - 3 items
  {
    comment: "The email templates are simply outstanding. Saved us countless hours of design work.",
    author: "Sarah Johnson",
    title: "@founder of enwriters",
    image: say,
    width: 200,
    height: 200
  },
  {
    comment: "I've tried many email builders, but this one takes the cake. The interface is intuitive, the templates are modern, and the support team is incredibly responsive. We've reduced our email design time by 75%.",
    author: "Michael Chen",
    title: "@CEO TechStart",
    image: say,
    width: 400,
    height: 300
  },
  {
    comment: "The collaborative features are game-changing. Our entire marketing team can work together seamlessly.",
    author: "Emily Davis",
    title: "@Marketing Director",
    image: say,
    width: 200,
    height: 350
  },
  // Add more testimonials for remaining rows...
  // Second row - 4 items
  {
    comment: "Exceptional value for money. The templates are professional and easy to customize.",
    author: "Alex Turner",
    title: "@client",
    image: say,
    width: 250,
    height: 200
  },
  // Continue with more testimonials...
  {
    comment: "Exceptional value for money. The templates are professional and easy to customize.",
    author: "Alex Turner",
    title: "@client",
    image: say,
    width: 250,
    height: 200
  },

  {
    comment: "Exceptional value for money. The templates are professional and easy to customize.",
    author: "Alex Turner",
    title: "@client",
    image: say,
    width: 250,
    height: 200
  },

  {
    comment: "Exceptional value for money. The templates are professional and easy to customize.",
    author: "Alex Turner",
    title: "@client",
    image: say,
    width: 250,
    height: 200
  },

  {
    comment: "Exceptional value for money. The templates are professional and easy to customize.",
    author: "Alex Turner",
    title: "@client",
    image: say,
    width: 250,
    height: 200
  },

  {
    comment: "Exceptional value for money. The templates are professional and easy to customize.",
    author: "Alex Turner",
    title: "@client",
    image: say,
    width: 250,
    height: 200
  },

  {
    comment: "Exceptional value for money. The templates are professional and easy to customize.",
    author: "Alex Turner",
    title: "@client",
    image: say,
    width: 250,
    height: 200
  },

  {
    comment: "Exceptional value for money. The templates are professional and easy to customize.",
    author: "Alex Turner",
    title: "@client",
    image: say,
    width: 250,
    height: 200
  },

  {
    comment: "Exceptional value for money. The templates are professional and easy to customize.",
    author: "Alex Turner",
    title: "@client",
    image: say,
    width: 250,
    height: 200
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <Section>
      <Container>
        <MainHeading className="smooth-features">Testimonials</MainHeading>
        <SubHeading>See what time travelers are saying</SubHeading>
        
        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              width={testimonial.width}
              height={testimonial.height}
            >
              <Comment>{testimonial.comment}</Comment>
              <AuthorSection>
                <AuthorImage 
                  src={testimonial.image} 
                  alt={testimonial.author}
                />
                <AuthorInfo>
                  <AuthorName>{testimonial.author}</AuthorName>
                  <AuthorTitle>{testimonial.title}</AuthorTitle>
                </AuthorInfo>
              </AuthorSection>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </Section>
  );
};

export default TestimonialsSection;