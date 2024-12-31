import React from "react";
import styled, { keyframes } from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { BookType, Building, ClipboardCopy, Cog, Layers, MailOpen, Notebook, NotebookPen, NotepadText, NotepadTextDashedIcon, Radar, TableOfContents } from "lucide-react";

// Animation for the animated text
const colorChange = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const SmoothFeaturesWrapper = styled.section`
  background-color: #f6f9fc;
  padding: 50px 0; /* Vertical padding */
`;

const Heading = styled.h4`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const AnimatedText = styled.span`
  background: linear-gradient(90deg, #ff4e50, #800000, #101d24, #800080, #101d24);
  background-clip: text;
  font-size: 5rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${colorChange} 3s ease infinite;
`;

const SubHeading = styled.p`
  text-align: center;
  color: #545e64;
  margin-bottom: 40px; /* Space below the subheading */
  line-height: 1.5;
  font-size: 1.4rem;
`;

const FeaturesContainer = styled(Row)`
  justify-content: center;
  gap: 10px; /* Gap between items */
`;

const FeatureItem = styled(Col)`
  width: 150px;
  height: 150px;
  background-color: #101d24; /* Dark background for items */
  color: white;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 2rem; /* Adjust icon size */
  margin-bottom: 10px;
`;

const FeatureHeading = styled.h5`
  margin: 5px 0;
`;

const FeatureDescription = styled.p`
  font-size: 0.8rem;
  color: #dcdcdc; /* Lighter text for description */
`;

// SmoothFeatures Component
const SmoothFeatures: React.FC = () => {
  const features = [
    {
      icon: <MailOpen />, // Replace with actual icons
      heading: "Email Marketing",
      description: "Effective email strategies.",
    },
    {
      icon: <TableOfContents />,
      heading: "Content Writing",
      description: "Expertly crafted articles.",
    },
    {
      icon: <Cog />,
      heading: "Editing",
      description: "Perfecting your content.",
    },
    {
      icon: <Notebook />,
      heading: "SEO Content",
      description: "Boost your online presence.",
    },
    {
      icon: <ClipboardCopy />,
      heading: "Copywriting",
      description: "Compelling ad copies.",
    },
    {
      icon: <NotepadText />,
      heading: "Blog Posts",
      description: "Engaging blog writing",
    },
    {
      icon: <Radar />,
      heading: "Technical Writing",
      description: "Clear technical documents.",
    },
    {
      icon: <BookType />,
      heading: "Creative Writing",
      description: "Imaginative and unique.",
    },
    {
      icon: <Layers />,
      heading: "Research Papers",
      description: "Detailed and accurate.",
    },
    {
      icon: <Building />,
      heading: "Business Proposals",
      description: "Professional and persuasive.",
    },
    {
      icon: <NotebookPen />,
      heading: "Case Studies",
      description: "In-depth success stories.",
    },
    {
      icon: <NotepadTextDashedIcon />,
      heading: "Event Content",
      description: "Captivating event coverage.",
    },
  ];

  return (
    <SmoothFeaturesWrapper>
      <Container>
        <Heading>
          <AnimatedText className="smooth-features">Smooth features</AnimatedText>
        </Heading>
        <SubHeading>
          Postcards’ feature-rich drag and drop email builder lets you create and <br />customize email marketing templates with tomorrow’s biggest design<br /> trends. Trusted by thousands of startups and market leaders.
        </SubHeading>
        <FeaturesContainer>
          {features.map((feature, index) => (
            <FeatureItem key={index} md={3}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureHeading>{feature.heading}</FeatureHeading>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureItem>
          ))}
        </FeaturesContainer>
      </Container>
    </SmoothFeaturesWrapper>
  );
};

export default SmoothFeatures;