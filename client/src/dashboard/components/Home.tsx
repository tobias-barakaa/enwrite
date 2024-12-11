import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { User } from 'lucide-react';
import HeroSection from './HeroSection';

const Home: React.FC = () => {

    
  return (
    <>
    <Container >
   

    <Row className="align-items-center mb-3">
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
                <strong>Tobias81</strong> <span>(mystats | nofeedback)</span>
            </div>
            <div>Billing Code: 23232423</div>
        </Col>
    </Row>
</Container>


    <hr />

    <HeroSection />


    
    </>
  )
}

export default Home
