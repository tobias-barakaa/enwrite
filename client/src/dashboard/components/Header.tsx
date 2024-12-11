import React from "react";
import styled from "styled-components";
import { Row, Col, InputGroup, FormControl, Button, Dropdown } from "react-bootstrap";
import { Search, Plus, Bell, User } from "lucide-react";
import enwrite from "../../assets/images/enwrite.png";
import HomeLayout from "./HomeLayout";
import { logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Styled Components
const HeaderWrapper = styled.div`
  background-color: #f5f5f5;
  padding: 10px 0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 40px;
    margin-right: 10px;
  }

  span {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const SearchInput = styled(InputGroup)`
  max-width: 300px;
`;

const IconButton = styled(Button)`
  background: white;
  border: none;
  color: #666;
  padding: 0.5rem;
  
  &:hover {
    background: #f8f9fa;
    color: #333;
  }
`;

const StyledButton = styled(Button)`
  height: 34px;
  margin-right: 15px;
  background-color: white !important;
  color: #000 !important;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f0f0f0 !important;
    color: #000 !important;
  }
`;



const Divider = styled.hr`
  border-color: darkgray;
  margin-top: 0;
`;

const Header: React.FC = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <HeaderWrapper>
      <div className="container">
        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <Logo>
              <img src={enwrite} alt="Logo" />
              <span>Enwriters</span>
            </Logo>
          </Col>

          <Col>
            <SearchInput>
              <FormControl placeholder="Search..." aria-label="Search" />
              <InputGroup.Text>
                <Search size={16} />
              </InputGroup.Text>
            </SearchInput>
          </Col>

          <Col xs="auto" className="d-flex align-items-center">
            <StyledButton>
              <Plus size={16} className="me-2" />
              Order Content
            </StyledButton>

           

            <Dropdown style={{ marginLeft: "20px", border: "1px #dfdfdf solid" }}>
            <Dropdown.Toggle as={IconButton}>
              <Bell size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>No alerts at the moment</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

            <Dropdown style={{ marginLeft: "20px", border: "1px #dfdfdf solid" }}>
            <Dropdown.Toggle as={IconButton}>
              <User size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/dashboard/payments">View Cash Payment</Dropdown.Item>
              <Dropdown.Item href="/dashboard/payments">Payments Method</Dropdown.Item>
              <Dropdown.Item href="/faq">Help</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Col>
        </Row>
      </div>
      <Divider />
      <HomeLayout />
    </HeaderWrapper>
  );
};

export default Header;
