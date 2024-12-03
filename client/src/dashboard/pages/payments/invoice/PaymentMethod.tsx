import React from 'react';
import { Container } from 'react-bootstrap';
import { BsPaypal } from 'react-icons/bs';

const PaymentMethod: React.FC = () => {
  return (
    <Container className="py-4" style={{ marginBottom: "100px" }}>
      <h5 className="mb-3">Can't Add Payment</h5>
      
      <div 
        className="border rounded p-3 d-flex align-items-center"
        style={{ height: '60px' }}
      >
        <div 
          className="d-flex align-items-center border rounded p-2 me-3"
          style={{ 
            height: '40px',
            width: '40px',
            backgroundColor: '#f8f9fa'
          }}
        >
          <BsPaypal size={24} />
        </div>
        <span className="text-muted">PayPal Account</span>
      </div>
    </Container>
  );
};

export default PaymentMethod;

