import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';

// interface LoginCredentials {
//   email: string;
//   password: string;
// }

const LoginAdmin: React.FC = () => {
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
        navigate('/admin/admin-dashboard');
      } catch (err) {
        console.error('Login failed:', err);
      }
    };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Admin Login</h2>
            
            {error && (
              <Alert variant="danger">
                { 'status' in error ? error.status : error.message }
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                 type="email"
                 name="email"
                 placeholder="email"
                 className="p-2"
                 value={formData.email}
                 onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="p-2"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button 
                type="submit"
                variant="dark"
                className="w-100"
                style={{ height: '60px' }}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default LoginAdmin;