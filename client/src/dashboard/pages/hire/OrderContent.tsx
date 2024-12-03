import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Info, FileText, KeyRound, Clock, Star, BookType } from 'lucide-react';
import "./OrderContent.css"
import { useCreateOrderMutation } from '../../../slices/orderApiSlice';
import { useNavigate } from 'react-router-dom';

interface OrderArticleData {
  title: string;
  description: string;
  keywords: string;
  wordCount: string;
  duration: string;
  complexity: string;
  language: string;
  content_type: string;
  quantity: number;
  cost: number;
}

const OrderContent: React.FC = () => {
  const [orderData, setOrderData] = useState<OrderArticleData>({
    title: '',
    description: '',
    keywords: '',
    wordCount: '300 words',
    duration: '1 day',
    complexity: 'General',
    language: 'American English',
    content_type: '',
    quantity: 1,
    cost: 7, 
  });

  const [error, setError] = useState<string | null>(null);

  const wordCountOptions = ['300 words', '500 words', '1000 words', '1500 words', '2000 words'];
  const durationOptions = ['1 day', '2 days', '3 days', '4 days', '5 days'];
  const complexityOptions = ['General', 'Advanced', 'Expert'];
  const languageOptions = ['American English', 'British English', 'Australian English'];
  const contentTypeOptions = ['Article', 'Blog', 'Email Copywriting', 'Technical Article', 'White Paper'];


  const [order] = useCreateOrderMutation();
  const navigate = useNavigate();

  const calculateCost = (wordCount: string, complexity: string) => {
    const wordCountValue = parseInt(wordCount.split(' ')[0]);
    let baseCost = 7; 

    if (complexity === 'Advanced') {
      baseCost = 10;
    } else if (complexity === 'Expert') {
      baseCost = 15;
    }

    return (baseCost / 300) * wordCountValue; 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => {
      const updatedData = { ...prev, [name]: value };

      if (name === 'wordCount' || name === 'complexity') {
        updatedData.cost = calculateCost(updatedData.wordCount, updatedData.complexity);
      }

      return updatedData;
    });
  };

  const handleCancel = () => {
    setOrderData({
      title: '',
      description: '',
      keywords: '',
      wordCount: '300 words',
      duration: '1 day',
      complexity: 'General',
      language: 'American English',
      content_type: '',
      quantity: 1,
      cost: 7,
    });
    setError(null);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(orderData, 'order data')
    if (!orderData.content_type) {
      setError('Content type is required!');
      return;
    }
    try {
     const response = await order(orderData).unwrap();
     console.log(response.orderId, 'response')
     navigate(`/dashboard/hire/${response.orderId}`);
           
    } catch (error) {

      setError(null);
    console.log('Order Data:', orderData);
      
    }
  };

  const calculateTotalCost = () => {
    return (orderData.cost * orderData.quantity).toFixed(2);
  };

  return (
    <Container className="py-4" style={{ width: "50%", margin: "0px", paddingLeft: "0px" }}>
      <Card className="shadow-sm">
        <Card.Header className="text-white d-flex align-items-center" style={{ background: "#4B4038" }}>
          <FileText className="me-2" />
          <h4 className="mb-0">Create New Content Order</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FileText className="me-2" size={18} />
                    <span className="label-content">Title</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={orderData.title}
                    onChange={handleInputChange}
                    placeholder="Enter content title"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <KeyRound className="me-2" size={18} />
                    <span className="label-content">Keywords</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="keywords"
                    value={orderData.keywords}
                    onChange={handleInputChange}
                    placeholder="Enter keywords (comma-separated)"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                <Info className="me-2" size={18} />
                <span className="label-content">Description</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={orderData.description}
                onChange={handleInputChange}
                placeholder="Provide detailed content requirements"
                rows={4}
                required
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <Clock className="me-2" size={18} />
                    <span className="label-content">Word Count</span>
                  </Form.Label>
                  <Form.Select
                    name="wordCount"
                    value={orderData.wordCount}
                    onChange={handleInputChange}
                  >
                    {wordCountOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <Star className="me-2" size={18} />
                    <span className="label-content">Complexity</span>
                  </Form.Label>
                  <Form.Select
                    name="complexity"
                    value={orderData.complexity}
                    onChange={handleInputChange}
                  >
                    {complexityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <BookType className="me-2" size={18} />
                    <span className="label-content">Language</span>
                  </Form.Label>
                  <Form.Select
                    name="language"
                    value={orderData.language}
                    onChange={handleInputChange}
                  >
                    {languageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
    <Form.Group className="mb-3">
      <Form.Label>
        <Clock className="me-2" size={18} />
        <span className="label-content">Duration</span>
      </Form.Label>
      <Form.Select
        name="duration"
        value={orderData.duration}
        onChange={handleInputChange}
      >
        {durationOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  </Col>

  <Col md={6}>
    <Form.Group className="mb-3">
      <Form.Label>
        <span className="label-content">Quantity</span>
      </Form.Label>
      <Form.Control
        type="number"
        name="quantity"
        value={orderData.quantity}
        min={1} // Ensure a minimum value of 1
        max={100} // Optional: Set an upper limit
        onChange={handleInputChange}
        placeholder="Enter quantity"
      />
    </Form.Group>
  </Col>


            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                <FileText className="me-2" size={18} />
                <span className="label-content">Content Type</span>
              </Form.Label>
              <Form.Select
                name="content_type"
                value={orderData.content_type}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select a content type
                </option>
                {contentTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}

            <Card className="bg-light mb-3 card-content">
              <Card.Body>
                <Row>
                  <Col>
                    <strong>Cost per Content:</strong> ${orderData.cost.toFixed(2)}
                  </Col>
                  <Col>
                    <strong>Total Quantity:</strong> {orderData.quantity}
                  </Col>
                  <Col>
                    <strong>Total Cost:</strong> ${calculateTotalCost()}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="text-end">
              <Button variant="secondary" className="me-2" onClick={handleCancel}>
                Clear
              </Button>
              <Button variant="primary" type="submit">
                Place Order
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderContent;
