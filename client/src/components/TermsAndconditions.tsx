import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

interface TermsProps {
  onCheckboxChange?: (isChecked: boolean) => void;
  isChecked?: boolean;
}

const TermsContainer = styled.div`
  margin: 1rem 0;
  font-size: 0.875rem;
  color: #6c757d;
`;

const StyledCheckbox = styled(Form.Check)`
  .form-check-input {
    border-color: #343a40;
    
    &:checked {
      background-color: #343a40;
      border-color: #343a40;
    }
    
    &:focus {
      border-color: #343a40;
      box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.25);
    }
  }

  .form-check-label {
    cursor: pointer;
    line-height: 1.4;
  }
`;

const Terms = styled.div`
  font-size: 0.75rem;
  color: #6c757d;
  margin-top: 0.5rem;
  padding-left: 1.75rem;
`;

const TermsText = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

const TermsAndConditions: React.FC<TermsProps> = ({ onCheckboxChange, isChecked }) => {
  return (
    <TermsContainer>
      <StyledCheckbox
        type="checkbox"
        id="termsCheckbox"
        label="I agree to the Terms and Conditions"
        checked={isChecked}
        onChange={(e) => onCheckboxChange?.(e.target.checked)}
      />
      <Terms>
        <TermsText>
          By signing up, we only collect and store your email and password for authentication purposes. 
          {/* We prioritize your privacy and ensure your information is securely encrypted.  */}
          Your email will be used solely for account-related communications. We do not share your 
          information with third parties.
        </TermsText>
      </Terms>
    </TermsContainer>
  );
};

export default TermsAndConditions;