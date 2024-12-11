// types.ts
export interface SendPasswordResetLinkParams {
    email: string;
  }
  
  export interface ApiError {
    message: string;
  }
  
  // hooks/usePasswordReset.ts
  
  
  // components/PasswordReset.tsx
  import React, { useState } from 'react';
  import styled from 'styled-components';
  import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useSendpasswordlinkMutation } from '../slices/forgotPasswordApiSlice';
  
  const StyledCard = styled(Card)`
    max-width: 450px;
    margin: 2rem auto;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    background-color: #fff;
    margin-top: 200px;
    
  `;
  
  const StyledCardHeader = styled(Card.Header)`
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
    padding: 1rem;
  `;
  
  const StyledButton = styled(Button)`
    width: 100%;
    height: 48px;
    font-weight: 500;
    
    &:disabled {
      cursor: not-allowed;
    }
  `;
  
  const StyledAlert = styled(Alert)`
    margin-bottom: 1rem;
  `;
  
  const PasswordReset: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [sendPasswordLink, { isLoading, isError, isSuccess, error }] = useSendpasswordlinkMutation();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (email.trim()) {
        sendPasswordLink({ email });
      }
    };
  
    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    return (
        <div style={{ backgroundColor: "white", height: "100vh", }}>
      <Container>
        <StyledCard>
          <StyledCardHeader>
            <h4 className="mb-0 text-center">Reset Password</h4>
          </StyledCardHeader>
          <Card.Body>
            {isSuccess && (
              <StyledAlert variant="success">
                Password reset link has been sent to your email address.
              </StyledAlert>
            )}
  
            {isError && (
              <StyledAlert variant="danger">
                {isError && 'data' in error ? (error.data as { message: string }).message : 'An error occurred. Please try again.'}
              </StyledAlert>
            )}
  
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={email.length > 0 && !isValidEmail(email)}
                  disabled={isLoading}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>
  
              <StyledButton
                variant="primary"
                type="submit"
                disabled={!isValidEmail(email) || isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </StyledButton>
            </Form>
          </Card.Body>
        </StyledCard>
      </Container>
      </div>
    );
  };
  
  export default PasswordReset;