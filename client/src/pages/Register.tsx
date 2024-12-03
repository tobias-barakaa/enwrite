import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import enwrite from '../assets/images/enwrite.png';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface ApiErrorResponse {
  status: number;
  data: {
    errors: Array<{
      field: {
        path: string;
      };
      message: string;
    }>;
  };
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  interface UserInfo {
    id: string;
    username: string;
    email: string;
    // Add other fields as needed
  }

  const { userInfo } = useSelector((state: { auth: { userInfo: UserInfo | null } }) => state.auth);
  
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/dashboard';
  const dispatch = useDispatch();

  useEffect(() => {
    if(userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

   
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({}); 

    try {
      const res = await register(formData).unwrap();
      dispatch(setCredentials({ ...res }))
      navigate('/dashboard');
    } catch (err) {
      console.log('Error:', err); // For debugging
      const error = err as ApiErrorResponse;
      
      if (error?.data?.errors) {
        const errors = error.data.errors.reduce(
          (acc: Record<string, string>, curr) => ({
            ...acc,
            [curr.field.path]: curr.message,
          }),
          {}
        );
        setFieldErrors(errors);
      }
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
              type="text"
              name="username"
              placeholder="Username"
              className={`p-2 ${fieldErrors.username ? 'is-invalid' : ''}`}
              value={formData.username}
              onChange={handleChange}
            />
            {fieldErrors.username && (
              <div className="text-danger small">{fieldErrors.username}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              className={`p-2 ${fieldErrors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
            />
            {fieldErrors.email && (
              <div className="text-danger small">{fieldErrors.email}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              className={`p-2 ${fieldErrors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
            />
            {fieldErrors.password && (
              <div className="text-danger small">{fieldErrors.password}</div>
            )}
          </Form.Group>
          <p>Already have an Account <Link to="/login">Login</Link></p>

          <Button
            type="submit"
            variant="dark"
            className="w-100"
            style={{ height: '60px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </Form>
        {error && typeof error === 'object' && 'data' in error && !('errors' in error.data) && (
          <p className="text-danger mt-3">Error: {error.data?.message || 'Something went wrong'}</p>
        )}
      </div>
    </div>
  );
};

export default Register;
