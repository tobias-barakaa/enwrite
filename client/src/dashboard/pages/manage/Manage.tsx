import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import "./Manage.css";

const Manage: React.FC = () => {
  return (
    <Container className="py-4">
      <Row className="align-items-center">
        <Col>
          <nav className="custom-nav d-flex align-items-center">
            <NavLink
              to="/dashboard/manage"
              className={({ isActive }) =>
                `custom-nav-item ${isActive ? "active" : ""}`
              }
            >
              WorkRooms
            </NavLink>
            <NavLink
              to="/dashboard/manage/my-orders"
              className={({ isActive }) =>
                `custom-nav-item ${isActive ? "active" : ""}`
              }
            >
              My Orders
            </NavLink>
          </nav>
          <hr className="nav-line" />
        </Col>

        <Col xs="auto">
          <Button variant="primary" className="order-button">
            Order Content
          </Button>
        </Col>
      </Row>
      <Outlet />
    </Container>
  );
};

export default Manage;
