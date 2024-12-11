import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import enwrite from '../assets/images/enwrite.png';
import { Link } from 'react-router-dom';
import Oauth from '../components/Oauth';


const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const LoginCard = styled.div`
  width: 400px;
  padding: 2.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  width: 80px;
  margin-bottom: 2rem;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  background-color: #343a40;
  color: white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background-color: #2b2f33;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;



const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 2px dotted #dee2e6;
  }

  span {
    margin: 0 1rem;
    color: #6c757d;
    font-size: 0.875rem;
  }
`;

const StyledInput = styled(Form.Control)`
  padding: 0.875rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #343a40;
    box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.25);
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  margin-top: 1rem;
  font-size: 0.875rem;
  text-align: center;
`;

const FieldError = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SignupLink = styled.p`
  margin: 1rem 0;
  font-size: 0.9rem;

  a {
    color: #343a40;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear field-specific error on change
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateInputs = () => {
    const errors: Record<string, string> = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return; // Stop submission if validation fails
    }

    try {
      const userData = await login(formData).unwrap();
      dispatch(setCredentials(userData));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <div className="text-center">
          <Logo src={enwrite} alt="Logo" />
        </div>

        <Oauth />


        <Divider>
          <span>or</span>
        </Divider>

        <SignupLink>
          Not with an account? <Link to="/get-started">Get Started</Link>
        </SignupLink>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <StyledInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!fieldErrors.email}
            />
            {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
          </Form.Group>

          <Form.Group className="mb-4">
            <StyledInput
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!fieldErrors.password}
            />
            {fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
          </Form.Group>

          <StyledButton type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </StyledButton>
        </Form>

        {error && 'data' in error && (
          <ErrorMessage>
            {(error.data as { message: string }).message}
          </ErrorMessage>
        )}

      <SignupLink style={{ marginTop: '20px' }}>
      Forgot Password?? <Link to="/password-reset">Reset Password</Link>
        </SignupLink>

      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
