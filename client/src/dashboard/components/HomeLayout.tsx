import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeLayout: React.FC = () => {
  return (
    <div className="container">
      <Row className="align-items-center mb-3">
        {["Dashboard", "Hire", "Manage", "Payments"].map((item, index) => (
          <Col key={index} xs="auto" className="nav-item">
            <Link
              to={`/dashboard/${item.toLowerCase() === "dashboard" ? "" : item.toLowerCase()}`}
              style={{
                textDecoration: "none",
                padding: "8px 12px",
                display: "inline-block",
                borderBottom: "2px solid transparent",
                color: "#000",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderBottom = "2px solid #000")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderBottom = "2px solid transparent")
              }
            >
              {item}
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeLayout;
