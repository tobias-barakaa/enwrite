import React, { useState } from 'react';
import styled from 'styled-components';
import { Accordion, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;

`;

const StyledCard = styled(Card)`
  margin-bottom: 1rem;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
`;

const StyledButton = styled(Button)`
  text-align: left;
  padding: 1rem;
  font-weight: 500;
  color: #2c3e50;
  background: transparent;
  border: none;
  
  &:focus {
    box-shadow: none;
  }
  
  &:hover {
    background: #f8f9fa;
  }
`;

const Answer = styled(Card.Body)`
  padding: 1.5rem;
  color: #666;
  line-height: 1.6;
`;

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What topics are suitable for blog posts?",
    answer: "Choose topics that align with your expertise and audience interests. Consider trending subjects, evergreen content, how-to guides, industry insights, and personal experiences. Focus on providing value through unique perspectives or solutions to common problems."
  },
  {
    id: 2,
    question: "How often should I publish new content?",
    answer: "Consistency is more important than frequency. Start with a sustainable schedule, such as once or twice a week. Quality should never be compromised for quantity. Consider your resources and audience engagement patterns when determining your publishing schedule."
  },
  {
    id: 3,
    question: "Do you offer refunds?",
    answer: "Yes, we offer refunds. If you're not satisfied with our services, please contact our support team within 30 days of purchase. We'll process your refund after reviewing your request."
  },
  {
    id: 4,
    question: "What's the ideal length for a blog post?",
    answer: "The ideal length varies depending on your topic and purpose. Generally, comprehensive posts (1,500-2,500 words) perform well for SEO and provide thorough coverage. However, shorter posts (500-1,000 words) can be effective for news updates or quick tips."
  },
  {
    id: 5,
    question: "How can I improve my writing style?",
    answer: "Focus on clarity and engagement. Use active voice, short paragraphs, and conversational tone. Include relevant examples, data, and personal insights. Read widely in your niche, practice regularly, and consider getting feedback from other writers or editors."
  }
];

const Faq: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>("");

  return (
    <FAQContainer>
      <div >
      <Title style={{ marginTop: "60px" }}>Frequently Asked Questions</Title>
      </div>

      <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey((key as string) || "")}>
        {faqData.map((item) => (
          <StyledCard key={item.id}>
            <Card.Header>
              <StyledButton
                variant="link"
                eventKey={item.id.toString()}
                onClick={() => 
                  setActiveKey(activeKey === item.id.toString() ? "" : item.id.toString())
                }
              >
                {item.question}
              </StyledButton>
            </Card.Header>
            <Accordion.Collapse eventKey={item.id.toString()}>
              <Answer>{item.answer}</Answer>
            </Accordion.Collapse>
          </StyledCard>
        ))}
      </Accordion>
    </FAQContainer>
  );
};

export default Faq;