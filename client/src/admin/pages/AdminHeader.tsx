import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const AdminHeader: React.FC = () => {
  return (

    <Container fluid className="admin-dashboard">

    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" style={{ borderRadius: "12px" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Admin Panel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ cursor: 'pointer' }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/admin/dashboard" end>
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/dashboard/orders">
              Orders
            </Nav.Link>
            <Nav.Link as={NavLink} to="/users">
              Users
            </Nav.Link>
            <Nav.Link as={NavLink} to="/settings">
              Settings
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/logout" className="btn btn-danger text-white">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Container>
  );
};

export default AdminHeader;
