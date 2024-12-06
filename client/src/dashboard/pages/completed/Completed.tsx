import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Dropdown, Spinner } from 'react-bootstrap';
import { format } from 'date-fns';
import { useGetCompletedOrdersQuery } from '../../../slices/admin/adminOrderApiSlice';
import pdfParse from 'pdf-parse';

interface OrderArticle {
  file_id: string;
  file_url: string;
  public_id: string;
  recipient_id: string;
  uploaded_by: string;
  order_article_id: string;
  created_at: string;
  title: string;
  description: string;
  keywords: string;
  complexity: string;
  word_count: string;
  duration: string;
  quantity: number;
  language: string;
  cost: string;
  status: string;
  article_created_at: string;
  article_updated_at: string;
}

interface Props {
  fileUrl: string; // Pass `file_url` as a prop to this component
  fileName?: string; // Optional file name
}


const Completed: React.FC<Props> = ({ fileUrl, fileName }) => {
  const [feedback, setFeedback] = useState<string>('');
  const [satisfaction, setSatisfaction] = useState<string>('Select Satisfaction');
  const { data: response, isLoading, isError } = useGetCompletedOrdersQuery({});
 
  const [textPdf, setTextPdf] = useState('');
const [set] = useState(true);
  

  

  

  const downloadPDF = async () => {
    try {
      const letme = fileUrl || response?.data?.[0]?.file_url;
      if (!letme) throw new Error('Failed to fetch the PDF');
  
      // Renamed to fetchResponse to avoid conflict
      const fetchResponse = await fetch(letme);
      const blob = await fetchResponse.blob();
      
      const urlObject = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlObject;
      link.download = fileName || 'document.pdf';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };


  const handleDelete = (orderId: string) => {
    // Implement delete functionality
    console.log('Deleting order:', orderId);
  };

  const handleAICheck = (orderId: string) => {
    // Implement AI check functionality
    console.log('Checking AI for order:', orderId);
  };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-4">
        <div className="alert alert-danger">Error loading completed orders</div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row>
        {response?.data.map((order) => (
          <Row key={order.file_id} className="mb-4">
            <Col md={7}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Order Details</h5>
                  <span className={`badge bg-${order.status.toLowerCase() === 'pending' ? 'warning' : 'success'}`}>
                    {order.status}
                  </span>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Col md={6}>
                      <h6 className="text-primary">Title</h6>
                      <p>{order.title}</p>
                    </Col>
                    <Col md={6}>
                      <h6 className="text-primary">Created At</h6>
                      <p>{format(new Date(order.created_at), 'PPP')}</p>
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col>
                      <h6 className="text-primary">Description</h6>
                      <p>{order.description}</p>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}>
                      <h6 className="text-primary">Word Count</h6>
                      <p>{order.word_count}</p>
                    </Col>
                    <Col md={4}>
                      <h6 className="text-primary">Duration</h6>
                      <p>{order.duration}</p>
                    </Col>
                    <Col md={4}>
                      <h6 className="text-primary">Cost</h6>
                      <p>${order.cost}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <h6 className="text-primary">Language</h6>
                      <p>{order.language}</p>
                    </Col>
                    <Col md={6}>
                      <h6 className="text-primary">Complexity</h6>
                      <p>{order.complexity}</p>
                    </Col>
                  </Row>

                  <div className="mt-3">
                    <Button 
                      variant="outline-primary" 
                      href={order.file_url} 
                      target="_blank" 
                      className="w-100"
                    >
                      View Delivered File
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>








            <h1>Completed</h1>
      <Button onClick={downloadPDF} variant="primary">
        {fileName}
      </Button>














            <Col md={5}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">Feedback</h5>
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter your feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="mb-3 flex-grow-1"
                    style={{ 
                      height: '300px', 
                      resize: 'none',
                      backgroundColor: '#f8f9fa'
                    }}
                  />
                  
                  <div className="d-flex gap-2">
                    <Dropdown className="flex-grow-1">
                      <Dropdown.Toggle 
                        variant="outline-primary" 
                        className="w-100"
                        style={{ height: '50px' }}
                      >
                        {satisfaction}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="w-100">
                        <Dropdown.Item onClick={() => setSatisfaction('Satisfied')}>
                          Satisfied
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setSatisfaction('Not Satisfied')}>
                          Not Satisfied
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Button 
                      variant="outline-danger" 
                      className="flex-grow-1"
                      style={{ height: '50px' }}
                      onClick={() => handleDelete(order.file_id)}
                    >
                      Delete
                    </Button>

                    <Button 
                      variant="outline-info" 
                      className="flex-grow-1"
                      style={{ height: '50px' }}
                      onClick={() => handleAICheck(order.file_id)}
                    >
                      Check AI
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default Completed;