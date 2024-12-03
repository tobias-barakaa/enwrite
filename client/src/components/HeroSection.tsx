import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HeroSection.css";
import enwrite from '../assets/images/ancient.webp';
import article from '../assets/images/article.jpg';
import pen from '../assets/images/pen.jpg';
import tea from '../assets/images/tea.jpg';
import watchme from '../assets/images/watchme.webp'




const HeroSection: React.FC = () => {
  return (
    <Container fluid className="hero-layout vh-100 d-flex flex-column justify-content-center">
      <Row className="h-100">
        {/* Left Side */}
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center px-4"
          style={{ maxWidth: "600px", marginTop:'280px' }}
        >
          <div>
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#EDEDED', fontSize: "40px" }}>
              Bespoke Writers for your <br />
              <span className="text-primar" style={{ color: "#B28D4B" }}>innovative</span> business
            </h1>
            <p className="lead mb-4" style={{ color: "#EDEDED"}}>
              We build custom websites or mobile apps for innovative businesses
              seeking a competitive edge.
            </p>
            <div className="d-flex align-items-center gap-3">
              <Button variant="outline-primary" className="rounded-pill px-4">
                Get Started
              </Button>
              <div className="get-in-touch position-relative text-primary fw-medium">
                Get in Touch
              </div>
            </div>
          </div>
        </Col>

        {/* Right Side */}
        <Col xs={12} md={6} className="position-relative" style={{ marginTop: "100px", marginLeft: "60px" }}>
          <div className="d-grid gap-4 h-100" style={{ gridTemplateColumns: "repeat(12, 1fr)" }}>
            <div
              className="bg-image item1"
              style={{
                gridColumn: "1 / span 4",
                gridRow: "6 / span 5",
                backgroundImage: `url(${enwrite})`,
              }}
            ></div>
            <div
              className="bg-image item2"
              style={{
                gridColumn: "5 / span 4",
                gridRow: "8 / span 5",
                backgroundImage: `url(${article})`,

              }}
            ></div>
            <div
              className="bg-image item3"
              style={{
                gridColumn: "5 / span 4",
                gridRow: "3 / span 5",
                backgroundImage: `url(${pen})`,
              }}
            ></div>
            <div
              className="bg-image item4"
              style={{
                gridColumn: "9 / span 4",
                gridRow: "1 / span 5",
                backgroundImage: `url(${tea})`,

              }}
            ></div>
            <div
              className="bg-image item5"
              style={{
                gridColumn: "9 / span 4",
                gridRow: "6 / span 5",
                backgroundImage: `url(${watchme})`,

              }}
            ></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
