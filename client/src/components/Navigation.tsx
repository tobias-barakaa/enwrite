import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MoveRight } from 'lucide-react';
import enwrite from '../assets/images/enwrite.png';
import { NavLink } from 'react-router-dom';
import PricingDropdown from './PricingDropdown';

// Only keep the essential custom styles that can't be achieved with Bootstrap utilities
// background-color: #1b1b1f;
const styles = `
body {
  background-color: #f6f9fc;
}

.custom-nav-border {
  border: 1px solid #4a4a4a !important;
}
  .navbar-brand {
  display: flex;
  align-items: center;
  gap: 0px;
}

.navbar-brand h2 {
  margin: 0;
  color: white;
  font-size: 1.5rem;
}

.get-started-btn:hover {
  background-color: #4a4a4a !important;
  color: white !important;
}
`;

const Navigation: React.FC = () => {
  return (
    <>
      <style>{styles}</style>
      <Container className="mt-0">
      <Navbar
  className="mx-auto rounded-pill custom-nav-border"
  style={{ position: "fixed", width: '650px', height: '50px', padding: '10px', backgroundColor: "#343a40" }}
>
          <Nav className="w-100 px-3 d-flex justify-content-between align-items-center">
            <NavLink to="/">
          <Navbar.Brand href="#home" className="text-white p-0">
              <img 
                src={enwrite} 
                alt="Enwriters Logo" 
                style={{ width: "50px", height: "50px" }}
              />
              <span>
                <h2>Enwriters</h2>
              </span>
            </Navbar.Brand>
            </NavLink>

            <NavLink to="blog" className="text-white p-0">
              Blog
            </NavLink>
            <Nav.Link href="#Pricing" className="text-white p-0">
              <PricingDropdown />
            </Nav.Link>
            <NavLink to="get-started">
            <Button 
              className="rounded-pill  text-white"
              style={{ padding: '4px 15px', backgroundColor: "#252946", border: 'none' }}
            >
              Get Started today<span className='px-2'><MoveRight color="white" size={28} /></span>
            </Button>
            </NavLink>
          </Nav>
        </Navbar>
      </Container>
    </>
  );
};

export default Navigation;