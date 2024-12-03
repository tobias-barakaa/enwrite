import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import "./Manage.css";
import WarningMessage from '../../components/manage/WarningMessage';

const Manage: React.FC = () => {
  const data = {
    title: "Sample Title",
    description: "Sample Description",
    keywords: "keyword1, keyword2",
    word_count: 500,
    duration: "2 hours",
    complexity: "Medium",
    language: "English",
    quantity: 1,
    cost: "$100",
    content_type: "Article",
    pending: true,
    is_paid: false
  };



 
  return (
    <Container className="py-4">
      <WarningMessage />
      
      <Container>
        <Row className="g-4">
          <Col xs={12} md={6} lg={4}>
            <Card className="h-100" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)',  border: "1px solid #ccc", borderRadius: "7px" }}>
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="mb-0">{data.title}</h6>
                  <div>
                    <Badge bg={data.pending ? 'warning' : 'success'} className="me-1">
                      {data.pending ? 'Pending' : 'Completed'}
                    </Badge>
                    <Badge bg={data.is_paid ? 'success' : 'danger'}>
                      {data.is_paid ? 'Paid' : 'Unpaid'}
                    </Badge>
                  </div>
                </div>

                <p className="text-muted small mb-2">{data.description}</p>
                
                <div className="small mb-3">
                  <div><strong>Keywords:</strong> {data.keywords}</div>
                  <div><strong>Word Count:</strong> {data.word_count}</div>
                  <div><strong>Duration:</strong> {data.duration}</div>
                  <div><strong>Complexity:</strong> {data.complexity}</div>
                  <div><strong>Language:</strong> {data.language}</div>
                  <div><strong>Quantity:</strong> {data.quantity}</div>
                  <div><strong>Cost:</strong> {data.cost}</div>
                  <div><strong>Type:</strong> {data.content_type}</div>
                </div>

                <div className="mt-auto">
                  <div 
                    className="btn-group w-100 form-button-group" 
                    role="group"
                  >
                    <button 
                      className="btn btn-light" 
                      style={{ backgroundColor: '#f8f9fa' }}
                    >
                      View
                    </button>
                    <button 
                      className="btn" 
                      style={{ backgroundColor: '#e9ecef' }}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn" 
                      style={{ backgroundColor: '#343a40', color: 'white' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Manage;