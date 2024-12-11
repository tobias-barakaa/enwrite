import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button, Container, Card, Alert, Spinner } from 'react-bootstrap';
import { useForgotPasswordMutation, useGetResetLinkQuery } from '../slices/forgotPasswordApiSlice';

const StyledCard = styled(Card)`
  max-width: 450px;
  margin: 2rem auto;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
  background-color: #D3D3D3;
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const ForgotPassword: React.FC = () => {
  const { id, token } = useParams<{ id: string; token: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const {
    isLoading: tokenLoading,
    isError: isTokenError
  } = useGetResetLinkQuery(
    { id: id || '', token: token || '' },
    { skip: !id || !token }
  );

  const [resetPassword, { isLoading: resetLoading }] = useForgotPasswordMutation();

  useEffect(() => {
    if (isTokenError) {
      setError('This password reset link is invalid or has expired');
      setTimeout(() => navigate('/forgot-password/token-expired'), 3000);
    }
  }, [isTokenError, navigate]);

  const validatePasswords = (): boolean => {
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validatePasswords()) return;

    try {
      if (!id || !token) {
        setError('Invalid reset link');
        return;
      }

      const result = await resetPassword({
        id,
        token,
        newPassword,
        confirmPassword
      }).unwrap();

      console.log('Response from resetPassword:', result);
      console.log(result, 'this is result')

      if (result.status == '201') {
        setSuccess('Password reset successfully!');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(result.message || 'Failed to reset password');
      }
    } catch (err) {
      const error = err as { data?: { message?: string } };
      setError(error.data?.message || 'An error occurred while resetting password');
    }
  };

  if (tokenLoading) {
    return (
      <LoadingOverlay>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </LoadingOverlay>
    );
  }

  return (
    <Container>
      <StyledCard>
        <StyledCardHeader>
          <h4 className="mb-0 text-center">Reset Your Password</h4>
        </StyledCardHeader>
        <Card.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" dismissible onClose={() => setSuccess('')}>
              {success}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={resetLoading}
                minLength={8}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={resetLoading}
                required
              />
            </Form.Group>

            <StyledButton
              variant="primary"
              type="submit"
              disabled={resetLoading || isTokenError}
            >
              {resetLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </StyledButton>
          </Form>
        </Card.Body>
      </StyledCard>
    </Container>
  );
};

export default ForgotPassword;
