import React from 'react';
import { Row, Col, InputGroup, FormControl, Button, Dropdown } from 'react-bootstrap';
import { Search, Plus, MessageSquare, Bell, User } from 'lucide-react';
import enwrite from "../../assets/images/enwrite.png";
import HomeLayout from './HomeLayout';
import { logout } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Header: React.FC = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const logoutHandler = async() => {
    try {
      await logoutApiCall({}).unwrap()
      dispatch(logout());
      navigate('/login')
      
    } catch (error) {
      console.log('Error:', error);    
    }
    
  }
  return (

    
    <>
      <div
        style={{
          backgroundColor: "#f5f5f5"
        }}
      >
        <div className="container">
          <Row className="align-items-center mb-3">
            <Col xs="auto" className="d-flex align-items-center">
              <div className="logo">
                <img src={enwrite} alt="Logo" style={{ height: "40px" }} />
                <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Enwriters</span>
              </div>
            </Col>

            <Col>
              <InputGroup style={{ maxWidth: "300px" }}>
                <FormControl placeholder="Search..." aria-label="Search" />
                <InputGroup.Text>
                  <Search size={16} />
                </InputGroup.Text>
              </InputGroup>
            </Col>

            <Col xs="auto" className="d-flex align-items-center">
              <Button
                variant="light"
                style={{
                  height: "34px",
                  marginRight: "15px",
                  backgroundColor: "white",
                }}
              >
                <Plus size={16} className="me-2" />
                Order Content
              </Button>

              <MessageSquare size={20} className="me-3 cursor-pointer" />

              <Dropdown className="me-3">
                <Dropdown.Toggle variant="light" style={{ height: "30px" }}>
                  <Bell size={20} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.ItemText>There are no alerts at the moment</Dropdown.ItemText>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle variant="light" style={{ height: "30px" }}>
                  <User size={20} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>View Cash Payment</Dropdown.Item>
                  <Dropdown.Item>Payments Method</Dropdown.Item>
                  <Dropdown.Item>Help</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                  onClick={logoutHandler}
                  >Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </div>

        <hr />

        <HomeLayout />
      <hr style={{ borderColor: "darkgray" }} />

      </div>

    </>
  );
};

export default Header;
