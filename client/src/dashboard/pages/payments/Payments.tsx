import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import "./Payments.css";

const Payments: React.FC = () => {
  const navItems = [
    { id: 1, name: "Invoices", path: "/dashboard/payments" },
    { id: 2, name: "Payment Methods", path: "/dashboard/payments/payment-methods" },
    { id: 3, name: "Transaction Reports", path: "/dashboard/payments/transaction-reports" },
  ];

  return (
    <>
      <Container className="py-4">
        <Row className="align-items-center mb-4">
          <Col>
            <h4 className="mb-0 fw-bold">Payments</h4>
          </Col>
          <Col xs="auto" className="text-end">
            <div className="mb-2">
              <span className="text-muted me-2">Cash Account:</span>
              <span className="fw-bold">$0.00</span>
            </div>
            <Button variant="outline-primary" size="sm" className="border-2">
              Add Payment Method
            </Button>
          </Col>
        </Row>

        <div className="custom-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `custom-nav-item ${isActive ? "active" : ""}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </Container>

      <hr className="nav-line mt-0" />

      {/* Render child components */}
      <Outlet />
    </>
  );
};

export default Payments;
