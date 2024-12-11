import React from "react";
import styled from "styled-components";
import image1 from "../assets/images/6ab2a322-eb39-4de6-a70e-925dad2b74cc.webp";
import image2 from "../assets/images/just-got-married.png";
import image3 from "../assets/images/not-yet-hes-lying.png";
import image4 from "../assets/images/stop-hating.png";

const PortfolioWrapper = styled.section`
  background-color: #fcfcfc;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 300px;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
  height: 150vh;
`;

const VisionText = styled.div`
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.5;
  text-align: right;
  background: linear-gradient(135deg, #2c5364, #203a43, #0f2027);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  align-self: flex-end;
  white-space: pre-line;
  margin-bottom: 20px;
  margin-right: 8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

const PortfolioItem = styled.div<{ depth: number }>`
  position: relative;
  width: 350px;
  height: 450px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-top: ${({ depth }) => depth * 120}px;
  border-radius: 15px;
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 15px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.2)
    );
    z-index: 1;
  }

  .heading {
    position: relative;
    z-index: 2;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .text {
    position: relative;
    z-index: 2;
    line-height: 1.6;
    font-size: 1rem;
    opacity: 0.9;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
`;

const Portfolio: React.FC = () => {
  const portfolioItems = [
    {
      heading: "High-Quality Editing",
      image: image1,
      text: "Professional editing and proofreading services tailored to your needs.",
    },
    {
      heading: "SEO Optimization",
      image: image2,
      text: "SEO-optimized articles designed to boost your visibility and rankings.",
    },
    {
      heading: "Creative Marketing",
      image: image3,
      text: "Tailored marketing content that resonates with your target audience.",
    },
    {
      heading: "Content Creation",
      image: image4,
      text: "High-quality content creation designed to engage and captivate readers.",
    },
  ];

  return (
    <PortfolioWrapper>
      <VisionText>
        We envision <br />
        a transformative <br />
        decade ahead.
      </VisionText>

      <ItemsContainer>
        {portfolioItems.map((item, index) => (
          <PortfolioItem
            key={index}
            depth={index}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="heading">{item.heading}</div>
            <div className="text">{item.text}</div>
          </PortfolioItem>
        ))}
      </ItemsContainer>
    </PortfolioWrapper>
  );
};

export default Portfolio;
