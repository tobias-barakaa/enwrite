import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import './AdminDashboard.css';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface Order {
  id: number;
  customer: string;
  amount: number;
  status: 'completed' | 'processing' | 'cancelled';
  date: string;
}

interface PendingItem {
  id: number;
  type: 'approval' | 'review' | 'shipment';
  description: string;
  priority: 'high' | 'medium' | 'low';
}

const AdminDashboard: React.FC = () => {
  const [users] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', joinDate: '2024-02-01' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive', joinDate: '2024-03-10' },
  ]);

  const [orders] = useState<Order[]>([
    { id: 1, customer: 'John Doe', amount: 299.99, status: 'completed', date: '2024-03-15' },
    { id: 2, customer: 'Jane Smith', amount: 149.99, status: 'processing', date: '2024-03-20' },
    { id: 3, customer: 'Mike Johnson', amount: 499.99, status: 'cancelled', date: '2024-03-22' },
  ]);

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

  return (
    <Container fluid className="admin-dashboard">
      <Row className="dashboard-header">
        <Col>
          <h1>Admin Dashboard</h1>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card className="dashboard-card">
            <Card.Header>
              <h5 className="mb-0">Recent Users</h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>
                        <Badge bg={getStatusBadge(user.status)}>{user.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="dashboard-card">
            <Card.Header>
              <h5 className="mb-0">Recent Orders</h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.customer}</td>
                      <td>${order.amount}</td>
                      <td>
                        <Badge bg={getStatusBadge(order.status)}>{order.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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