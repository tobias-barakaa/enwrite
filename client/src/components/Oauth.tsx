import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useGoogleMutation } from '../slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { FaGoogle } from 'react-icons/fa';
import styled from "styled-components";

import "./Oauth.css";




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


const GoogleButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  background-color: transparent;
  color: #343a40;
  border: 1px solid #343a40;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const Oauth: React.FC = () => {
  const auth = getAuth(app);
  const [googleSend, { isLoading, isError, error }] = useGoogleMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      // Sign in with Google popup
      const resultFromGoogle = await signInWithPopup(auth, provider);

      // Extract user info from Google result
      const userInfo = {
        name: resultFromGoogle.user.displayName || '',
        email: resultFromGoogle.user.email || '',
        photoURL: resultFromGoogle.user.photoURL || '',
      };

      // Send the data to backend using Redux mutation
      const response = await googleSend(userInfo).unwrap();

      dispatch(setCredentials({ ...response }))
      // Redirect on success
      navigate('/dashboard');
    } catch (error: unknown) {
      console.error('Error during Google authentication:', error);
    }
  };

  return (
    <div>
     

      <GoogleButton className='google-button' onClick={handleGoogleClick} disabled={isLoading}>
          <FaGoogle />
          
          {isLoading ? 'Authenticating...' : 'Continue with Google'}

        </GoogleButton>
      {isError && (
        <p className="text-danger">
          Failed to authenticate: 
          {'data' in error ? (error.data as { message: string }).message : 'An error occurred'}
        </p>
      )}
    </div>
  );
};

export default Oauth;

