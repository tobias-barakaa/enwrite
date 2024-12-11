import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import styled from "styled-components";
import TermsAndConditions from "../components/TermsAndconditions";
import enwrite from '../assets/images/enwrite.png';
import Oauth from "../components/Oauth";


interface FormData {
  username: string;
  email: string;
  password: string;
}

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120vh;
  background-color: #f7f6f5;
`;

const FormCard = styled.div`
  width: 400px;
  padding: 2rem;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const LogoContainer = styled.div`
  text-align: center;
  margin: 1.5rem 0 2rem;

  img {
    width: 80px;
    height: auto;
  }
`;

const StyledButton = styled.button<{ variant?: string }>`
  width: 100%;
  height: ${(props) => (props.variant === "google" ? "48px" : "60px")};
  background-color: ${(props) => (props.variant === "google" ? "#f5f5f5" : "#343a40")};
  color: ${(props) => (props.variant === "google" ? "#343a40" : "#ffffff")};
  border: ${(props) => (props.variant === "google" ? "1px solid #e0e0e0" : "none")};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.variant === "google" ? "#eaeaea" : "#2b2f33")};
    transform: translateY(-1px);
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

  hr {
    flex: 1;
    border: none;
    border-top: 2px dotted #d1d1d1;
  }

  span {
    margin: 0 1rem;
    color: #6c757d;
    font-size: 0.9rem;
  }
`;

const StyledInput = styled(Form.Control)<{ isInvalid?: boolean }>`
  height: 50px;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.isInvalid ? "#dc3545" : "#e0e0e0")};
  background-color: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #343a40;
    box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.25);
  }
`;

const ErrorText = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const LoginLink = styled.p`
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


const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ username: "", email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false); // Track checkbox state
  const [checkboxError, setCheckboxError] = useState(""); // Error for the checkbox

  interface UserInfo {
    id: string;
    username: string;
    email: string;
    // Add other fields as necessary
  }

  const { userInfo } = useSelector((state: { auth: { userInfo: UserInfo } }) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/dashboard";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({}); // Reset field errors
    setCheckboxError(""); // Reset checkbox error
  
    // Validate fields
    const errors: Record<string, string> = {};
    if (!formData.username.trim()) errors.username = "Username is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.password.trim()) errors.password = "Password is required.";
  
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return; // Prevent form submission
    }
  
    // Validate checkbox
    if (!isChecked) {
      setCheckboxError("You must agree to the Terms and Conditions.");
      return; // Prevent form submission
    }
  
    try {
      // Proceed only if validation passes
      const res = await register(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err); // For debugging
    }
  };
  

  return (
    <PageContainer>
      <FormCard>
        <LogoContainer>
          <div className="text-center ">
          <img src={enwrite} alt="Logo" style={{ width: '80px' }} />
        </div>
        </LogoContainer>

        <Oauth />

        <Divider>
          <hr />
          <span>or</span>
          <hr />
        </Divider>
        <LoginLink>
            Already have an Account? <Link to="/login">Login</Link>
          </LoginLink>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <StyledInput
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!fieldErrors.username}
            />
            {fieldErrors.username && <ErrorText>{fieldErrors.username}</ErrorText>}
          </Form.Group>

          <Form.Group className="mb-3">
            <StyledInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!fieldErrors.email}
            />
            {fieldErrors.email && <ErrorText>{fieldErrors.email}</ErrorText>}
          </Form.Group>

          <Form.Group className="mb-3">
            <StyledInput
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!fieldErrors.password}
            />
            {fieldErrors.password && <ErrorText>{fieldErrors.password}</ErrorText>}
          </Form.Group>

          <TermsAndConditions
            isChecked={isChecked}
            onCheckboxChange={setIsChecked}
          />
          {checkboxError && <ErrorText>{checkboxError}</ErrorText>}

          <StyledButton type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </StyledButton>
        </Form>

        {error && 'data' in error && !(error.data as { message?: string; errors?: { [key: string]: string } }).errors && (
  <ErrorText className="mt-3">
    Error: {(error.data as { message?: string }).message || "Something went wrong"}
  </ErrorText>
)}

      </FormCard>
    </PageContainer>
  );
};

export default Register;
