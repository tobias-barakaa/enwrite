import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const HirePage: React.FC = () => {
  


  return (
    <Container>
    

      {/* Render the child route */}
      <Outlet />
    </Container>
  );
};

export default HirePage;
