import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { formatDistanceToNow, differenceInMinutes } from 'date-fns';
import { FiEdit2, FiTrash2, FiClock } from 'react-icons/fi';
import { useGetOrdersByUserQuery } from '../../../slices/orderApiSlice';

interface Order {
  id: string;
  title: string;
  complexity: string;
  content_type: string;
  cost: string;
  created_at: string;
  description: string;
  duration: string;
  is_paid: boolean;
  keywords: string;
  language: string;
  quantity: number;
  word_count: string;
}

const WorkRoom: React.FC = () => {

  const userInfoString = localStorage.getItem("userInfo");

let userId: string | null = null;
if (userInfoString) {
  const userInfo = JSON.parse(userInfoString);
  userId = userInfo?.data?.user?.id || null; // Safely retrieve the userId
}
  const { data: response, isLoading, isError } = useGetOrdersByUserQuery(userId || '');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    console.log('API Response:', response);
    if (Array.isArray(response?.data)) { // Directly check if `data` is an array
      setOrders(response.data); // Use `response.data` directly to set orders
    } else {
      console.error('Unexpected data structure:', response);
    }
  }, [response]);
  

  const canModify = (createdAt: string): boolean => {
    const diffInMinutes = differenceInMinutes(new Date(), new Date(createdAt));
    return diffInMinutes <= 40;
  };

  const handleEdit = (orderId: string) => {
    console.log('Edit order:', orderId);
  };

  const handleDelete = (orderId: string) => {
    console.log('Delete order:', orderId);
  };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Alert variant="danger">Failed to fetch orders. Please try again later.</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4 min-vh-100">
      <Row className="mb-4">
        <Col>
          {/* <h2 className="mb-3">Work Room
</h2> */}
          <Alert variant="info" className="d-flex align-items-center">
            <FiClock className="me-2" size={20} />
            You can only edit or delete orders within 40 minutes of creation.
          </Alert>
        </Col>
      </Row>

      <Row className="g-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Col key={order.id} xs={12}>
              <OrderCard
                order={order}
                canModify={canModify(order.created_at)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No orders available at the moment.</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

interface OrderCardProps {
  order: Order;
  canModify: boolean;
  onEdit: (orderId: string) => void;
  onDelete: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, canModify, onEdit, onDelete }) => (
  <Card className="border-1 shadow-sm hover-card">
    <Card.Body>Work Room


      <Row>
        <Col md={8}>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h4 className="mb-2">{order.title}</h4>
              <p className="text-muted mb-2">{order.description}</p>
            </div>
            <Badge
              bg={order.is_paid ? 'success' : 'warning'}
              className="ms-2 px-3 py-2"
            >
              {order.is_paid ? 'Paid' : 'Pending Payment'}
            </Badge>
          </div>

          <Row className="g-3">
            <Col sm={6} md={4}>
              <DetailItem label="Content Type" value={order.content_type} />
              <DetailItem label="Complexity" value={order.complexity} />
            </Col>
            <Col sm={6} md={4}>
              <DetailItem label="Language" value={order.language} />
              <DetailItem label="Word Count" value={order.word_count} />
            </Col>
            <Col sm={6} md={4}>
              <DetailItem label="Duration" value={order.duration} />
              <DetailItem label="Cost" value={`$${order.cost}`} />
            </Col>
          </Row>
        </Col>

        <Col md={4} className="border-start">
          <div className="d-flex flex-column h-100">
            <div className="mb-3">
              <small className="text-muted d-block mb-1">Created</small>
              <span>
                {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
              </span>
            </div>

            <div className="mb-3">
              <small className="text-muted d-block mb-1">Time Remaining</small>
              <TimeRemaining createdAt={order.created_at} />
            </div>

            <div className="mt-auto">
              <div className="d-flex gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => onEdit(order.id)}
                  disabled={!canModify}
                  className="flex-grow-1"
                >
                  <FiEdit2 className="me-1" /> Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(order.id)}
                  disabled={!canModify}
                  className="flex-grow-1"
                >
                  <FiTrash2 className="me-1" /> Delete
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

const TimeRemaining: React.FC<{ createdAt: string }> = ({ createdAt }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const diffInMinutes = 40 - differenceInMinutes(new Date(), new Date(createdAt));
      setTimeLeft(diffInMinutes > 0 ? `${diffInMinutes} minutes` : 'Time expired');
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, [createdAt]);

  if (timeLeft === 'Time expired') {
    return null;
  }

  return (
    <span className="d-flex align-items-center">
      <FiClock className="me-1" />
      {timeLeft}
    </span>
  );
};

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="mb-2">
    <small className="text-muted d-block">{label}</small>
    <span className="fw-semibold">{value}</span>
  </div>
);

export default WorkRoom;
