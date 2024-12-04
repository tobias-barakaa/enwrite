import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import './AdminDashboard.css';
import { useGetRecentQuery, useGetUsersQuery } from '../../slices/admin/adminOrderApiSlice';
import { Link } from 'react-router-dom';

interface User {
  username: string;
  role_name: string;
}

interface UserResponse {
  success: boolean;
  message: string;
  data: User[];
}
interface Order {
  id: number;
  customer: string;
  amount: string;
  status: 'completed' | 'processing' | 'cancelled';
  date: string;
  username: string;
  message: string;
  is_paid: boolean;
}

interface PendingItem {
  id: number;
  type: 'approval' | 'review' | 'shipment';
  description: string;
  priority: 'high' | 'medium' | 'low';
}



const AdminDashboard: React.FC = () => {

  const { data: recent, isLoading, error } = useGetRecentQuery({});
  const [orders, setOrders] = useState<Order[]>([]);
  // const [users, setUsers] = useState<User[]>([]);
  const { data: usersResponse, isLoading: isLoadingUser, error: errorUser } = useGetUsersQuery({});
const [users, setUsers] = useState<User[]>([]);

useEffect(() => {
  if (usersResponse?.success && usersResponse.data) {
    setUsers(usersResponse.data);
  }
}, [usersResponse]);


  // Load data into state when fetched
  useEffect(() => {
    if (recent && recent.orders) {
      setOrders(recent.orders);
    }
  }, [recent]);

  // const [users] = useState<User[]>([
  //   { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', joinDate: '2024-01-15' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', joinDate: '2024-02-01' },
  //   { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive', joinDate: '2024-03-10' },
  // ]);




  const [pendingItems] = useState<PendingItem[]>([
    { id: 1, type: 'approval', description: 'New vendor registration', priority: 'high' },
    { id: 2, type: 'review', description: 'Customer complaint', priority: 'medium' },
    { id: 3, type: 'shipment', description: 'International order', priority: 'low' },
  ]);

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'success',
      inactive: 'danger',
      completed: 'success',
      processing: 'warning',
      cancelled: 'danger',
      high: 'danger',
      medium: 'warning',
      low: 'info',
    };
    return statusColors[status as keyof typeof statusColors];
  };

  const getStatusUserBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'danger';
      case 'client':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  return (
    <Container fluid className="admin-dashboard">
     

      <Row className="mt-4">






     

<Col md={4} className="mb-4">
          <Card className="dashboard-card">
            <Card.Header>
              <h5 className="mb-0">Recent Users</h5>
            </Card.Header>
            <Card.Body>
              {/* {isLoadingUser && <p>Loading...</p>}
              {errorUser && (
                // <p className="text-danger">
                //   Error loading orders: {'status' in errorUser ? Status ${errorUser.status} : errorUser.message || 'Unknown error'}
                // </p>
              )} */}

              {!isLoadingUser && !errorUser && (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((userItem: User) => (
                      <tr key={userItem.username}>
                        <td>{userItem.username}</td>
                        <td>
                          <Badge bg={getStatusUserBadge(userItem.role_name)}>
                            {userItem.role_name}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>



        <Col md={4} className="mb-4">
  <Card className="dashboard-card">
    <Card.Header>
      <h5 className="mb-0">Recent Orders</h5>
    </Card.Header>
    <Card.Body>
      {isLoading && <p>Loading...</p>}
      {error && (
        <p className="text-danger">
          Error loading orders: {'status' in error ? `Status ${error.status}` : error.message || 'Unknown error'}
        </p>
      )}
      {!isLoading && !error && (
        <Table hover responsive>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Is Paid</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/admin/dashboard/${order.id}`} className="text-decoration-none">
                    {order.username}
                  </Link>
                </td>
                <td>${parseFloat(order.amount.toString()).toFixed(2)}</td>
                <td>
                  <Badge bg={getStatusBadge(order.status)}>{order.status}</Badge>
                </td>
                <td>
                  {order.is_paid ? <Badge bg="success">Yes</Badge> : <Badge bg="danger">No</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card.Body>
  </Card>
</Col>

        <Col md={4} className="mb-4">
          <Card className="dashboard-card">
            <Card.Header>
              <h5 className="mb-0">Pending Items</h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.type}</td>
                      <td>{item.description}</td>
                      <td>
                        <Badge bg={getStatusBadge(item.priority)}>{item.priority}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;