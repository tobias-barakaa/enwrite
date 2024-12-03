import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import enwrite from '../assets/images/enwrite.png';
import AuthLinks from '../utils/AuthLinks';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await login(formData).unwrap();
      dispatch(setCredentials(userData));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#f7f6f5' }}
    >
      <div
        className="p-4 rounded-4 border"
        style={{
          width: '400px',
          backgroundColor: '#f7f6f5',
          borderRadius: '200px',
        }}
      >
        <div className="text-center mt-3 mb-4">
          <img src={enwrite} alt="Logo" style={{ width: '80px' }} />
        </div>

        <Button
          variant="outline-dark"
          className="w-100 d-flex align-items-center justify-content-center mb-3"
        >
          <FaGoogle className="me-2" />
          Continue with Google
        </Button>

        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" style={{ borderStyle: 'dotted' }} />
          <span className="mx-2 text-muted">or</span>
          <hr className="flex-grow-1" style={{ borderStyle: 'dotted' }} />
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              className="p-2"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              className="p-2"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <AuthLinks />


          <Button
            type="submit"
            variant="dark"
            className="w-100"
            style={{ height: '60px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </Button>
        </Form>
        {error && <p className="text-danger mt-3">Error: {error?.data?.message}</p>}
      </div>
    </div>
  );
};

export default Login;
