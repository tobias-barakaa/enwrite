import React from 'react';
import styled from 'styled-components';
import { Check } from 'lucide-react';

interface PricingTier {
  words: number;
  price: number;
  features: string[];
}

const NavItemWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 9999;
`;

const NavLinkStyled = styled.a`
  color: white;
  text-decoration: none;
  padding: 0;
  cursor: pointer;

  
  &:hover {
    color: #e0e0e0;
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 1rem;
  width: 800px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 1000;
  padding: 1.5rem;

  ${NavItemWrapper}:hover & {
    opacity: 1;
    visibility: visible;
  }

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
`;

const PricingCard = styled.div`
  padding: 1.5rem;
  border-radius: 12px;
  background: #f8f9fa;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const PricingHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const WordCount = styled.h3`
  font-size: 1.25rem;
  color: #343a40;
  margin: 0;
  font-weight: 600;
`;

const Price = styled.div`
  font-size: 2rem;
  color: #343a40;
  font-weight: bold;
  margin: 0.5rem 0;

  span {
    font-size: 1rem;
    color: #6c757d;
    font-weight: normal;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #495057;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;

  svg {
    color: #28a745;
    flex-shrink: 0;
  }
`;

const PricingDropdown: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      words: 300,
      price: 7,
      features: [
        'Fast 24-hour delivery',
        'SEO-optimized content',
        'One round of revisions',
        'Grammar perfect content',
        'Topic research included'
      ]
    },
    {
      words: 600,
      price: 12,
      features: [
        'Fast 24-hour delivery',
        'SEO-optimized content',
        'Two rounds of revisions',
        'Grammar perfect content',
        'Topic research included',
        'Keyword optimization'
      ]
    },
    {
      words: 1000,
      price: 18,
      features: [
        'Priority 24-hour delivery',
        'SEO-optimized content',
        'Unlimited revisions',
        'Grammar perfect content',
        'In-depth topic research',
        'Keyword optimization',
        'Meta description included'
      ]
    }
  ];

  return (
    <NavItemWrapper>
      <NavLinkStyled>Pricing</NavLinkStyled>
      <DropdownContainer>
        <Grid>
          {pricingTiers.map((tier, index) => (
            <PricingCard key={index}>
              <PricingHeader>
                <WordCount>{tier.words} Words</WordCount>
                <Price>${tier.price} <span>/article</span></Price>
              </PricingHeader>
              <FeatureList>
                {tier.features.map((feature, featureIndex) => (
                  <Feature key={featureIndex}>
                    <Check size={16} />
                    {feature}
                  </Feature>
                ))}
              </FeatureList>
            </PricingCard>
          ))}
        </Grid>
      </DropdownContainer>
    </NavItemWrapper>
  );
};

export default PricingDropdown;