import React from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { Search, Facebook, Twitter, Linkedin } from 'lucide-react';
import enwrite from "../../assets/images/enwrite.png";

const Footer: React.FC = () => {
  return (
    <footer style={{ 
      backgroundColor: '#f5f5f5', 
      borderTop: '3px solid #dcdcdc', 
      padding: '40px 0' 
    }}>
      <Container>
        <Row>
          {/* Navigate */}
          <Col>
            <h5 className="mb-3">Navigate</h5>
            <ul className="list-unstyled">
              <li>Dashboard</li>
              <li>Hire</li>
              <li>Manage</li>
              <li>Payments</li>
              <li>Post a Job</li>
            </ul>
          </Col>

          {/* Company Info */}
          <Col>
            <h5 className="mb-3">Company Info</h5>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Team</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Investors</li>
            </ul>
          </Col>

          {/* Resources */}
          <Col>
            <h5 className="mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li>Help & FAQ</li>
              <li>Blog</li>
              <li>Contact Us</li>
              <li>APIs</li>
            </ul>
          </Col>

          {/* Policies */}
          <Col>
            <h5 className="mb-3">Policies</h5>
            <ul className="list-unstyled">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
              <li>Data Protection</li>
            </ul>
          </Col>

          {/* Start Hiring Today */}
          <Col>
            <h5 className="mb-3">Start Hiring Today</h5>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text id="basic-addon2">
                <Search />
              </InputGroup.Text>
            </InputGroup>

            <h5 className="mt-4 mb-3">Connect With Us</h5>
            <div>
              <Facebook className="me-3" />
              <Twitter className="me-3" />
              <Linkedin />
            </div>
          </Col>
        </Row>

        <hr className="my-4" />

        <div className="text-center">
          <img src={enwrite} style={{ width: "50px" }} /> | Get Work Done
        </div>
      </Container>
    </footer>
  );
};

export default Footer;