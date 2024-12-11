import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { User } from 'lucide-react';
import HeroSection from '../../components/HeroSection';
import UserInfo from './UserInfo';

const HomeDashboard: React.FC = () => {
  return (
    <>
    <Container>
  <Row className="align-items-center mb-3">
    {/* Left Side */}
    <Col xs="auto">
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '1px solid #000',
          borderRadius: '50%',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <User size={24} />
      </div>
    </Col>
    <Col>
      <div>
        <UserInfo />
      </div>
    </Col>

    {/* Right Side */}
    <Col xs="auto" className="text-end">
      <div style={{ fontWeight: "bold", color: "#333" }}>
        Cash Account: $0.00
      </div>
      <div>
        <a
          href="#"
          style={{
            textDecoration: "underline",
            color: "#007bff",
            fontWeight: "bold",
          }}
        >
          Add Payment Method
        </a>
      </div>
    </Col>
  </Row>
</Container>



    <hr />

    <HeroSection />


    
    </>
  )
}

export default HomeDashboard
