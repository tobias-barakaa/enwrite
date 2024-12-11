import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeLayout: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("Dashboard");

  const menuItems = ["Dashboard", "Hire", "Manage", "Payments", "Completed"];

  return (
    <div className="container">
      <Row className="align-items-center" style={{ marginBottom: "-14px" }}>
        {menuItems.map((item, index) => (
          <Col key={index} xs="auto" className="nav-item">
            <Link
              to={`/dashboard/${item.toLowerCase() === "dashboard" ? "" : item.toLowerCase()}`}
              style={{
                textDecoration: "none",
                padding: "8px 12px",
                display: "inline-block",
                borderBottom: "2px solid transparent",
                color: "#000",
                backgroundColor: activeItem === item ? "#fff" : "transparent",
                borderRadius: "4px",
              }}
              onClick={() => setActiveItem(item)}
              
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
