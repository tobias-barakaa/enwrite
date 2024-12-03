import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ShoppingCart } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const HirePage: React.FC = () => {
  


  return (
    <Container>
    

      {/* Render the child route */}
      <Outlet />
    </Container>
  );
};

export default HirePage;
