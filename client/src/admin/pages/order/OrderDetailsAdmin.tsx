import React, { useState } from 'react';
import { Card, Row, Col, Badge, Form, Button, Container } from 'react-bootstrap';
import { Upload } from 'lucide-react';
import { useGetOrderByIdQuery, useUploadArticleFileMutation } from '../../../slices/admin/adminOrderApiSlice';
import { useParams } from 'react-router-dom';


const OrderDetailsAdmin: React.FC = () => {
  const { id } = useParams();
  const { data: response } = useGetOrderByIdQuery(id);
  const order = response?.data;

  const [file, setFile] = useState<File | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>(order?.status || 'Pending');

  const [uploadArticleFile] = useUploadArticleFileMutation();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'primary';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'danger';
      case 'Under Review':
        return 'info';
      default:
        return 'secondary';
    }
  };



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      console.log('Selected File:', selectedFile); 
    }
  };

  

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    console.log('Status updated:', selectedStatus);
  };





  const handleSend = async () => {
    if (!file) {
      alert('Please choose a file to upload.');
      return;
    }
  
    if (!selectedStatus) {
      alert('Please select a status before uploading.');
      return;
    }
  
    const payload = {
      article_id: order.order_id,
      user_id: order.user_id,
      file,
      status: selectedStatus,
    };
  
    console.log('Payload:', payload); // Debug log
  
    try {
      const result = await uploadArticleFile(payload).unwrap();
      console.log('Upload Result:', result); // Debug log
      alert('File uploaded successfully!');
      setFile(null);
    } catch (error) {
      console.error('Error sending file:', error);
      alert('An error occurred while uploading the file.');
    }
  };
  
  
  






  if (!order) {
    return <div className="text-center p-4">Loading...</div>;
  }





  return (
    <Container className="py-4">
      <Row>
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Order Details</h4>
                <Badge bg={getStatusBadge(order.status)} className="px-3 py-2">
                  {order.status}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col md={6}>
                  <h5 className="text-muted mb-3">Order Information</h5>
                  <p><strong>Order ID:</strong> <span className="text-muted">{order.order_id}</span></p>
                  <p><strong>Title:</strong> <span className="text-muted">{order.title}</span></p>
                  <p><strong>Word Count:</strong> <span className="text-muted">{order.word_count}</span></p>
                  <p><strong>Duration:</strong> <span className="text-muted">{order.duration}</span></p>
                  <p><strong>Cost:</strong> <span className="text-success">${order.cost}</span></p>
                  <p><strong>Payment Status:</strong> 
                    <Badge bg={order.is_paid ? 'success' : 'danger'} className="ms-2">
                      {order.is_paid ? 'Paid' : 'Unpaid'}
                    </Badge>
                  </p>
                </Col>
                <Col md={6}>
                  <h5 className="text-muted mb-3">Client Information</h5>
                  <p><strong>Username:</strong> <span className="text-muted">{order.username}</span></p>
                  <p><strong>Email:</strong> <span className="text-muted">{order.email}</span></p>
                  <p><strong>Created:</strong> <span className="text-muted">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span></p>
                  <p><strong>Last Updated:</strong> <span className="text-muted">
                    {new Date(order.updated_at).toLocaleDateString()}
                  </span></p>
                </Col>
              </Row>
              
              <h5 className="text-muted mb-3">Project Details</h5>
              <p><strong>Description:</strong></p>
              <p className="text-muted">{order.description}</p>
              
              <p><strong>Keywords:</strong></p>
              <div className="d-flex gap-2 flex-wrap">
  {order.keywords
    .replace(/{|}/g, '') // Remove curly braces
    .split(',') // Split by comma
    .map((keyword: string, index: number) => (
      <Badge key={index} bg="light" text="dark" className="px-3 py-2">
        {keyword.replace(/"/g, '')} {/* Remove any remaining quotes */}
      </Badge>
    ))}
</div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white py-3">
              <h4 className="mb-0">Update Order</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Update Status</Form.Label>
                  <Form.Select 
                    
                    className="mb-3"

                    id="status-select" value={selectedStatus} onChange={handleStatusChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
  <Form.Label>Upload Deliverable</Form.Label>
  <div className="d-grid">
    <label className="btn btn-outline-primary">
      <Upload size={18} className="me-2" />
      {file ? file.name : 'Choose File'}
      <input 
        type="file" 
        className="d-none" 
        accept=".pdf,.csv" 
        onChange={handleFileChange} 
      />
    </label>
  </div>
</Form.Group>

                <div className="d-grid">
          <Button className='button-update' variant='secondary' onClick={handleUpdateStatus}>Update Status</Button>

                  <Button variant="primary" onClick={handleSend} style={{ marginTop: "10px" }}>
                    Update Order
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header className="bg-white py-3">
              <h4 className="mb-0">Order Specifications</h4>
            </Card.Header>
            <Card.Body>
              <p><strong>Language:</strong> <span className="text-muted">{order.language}</span></p>
              <p><strong>Complexity:</strong> <span className="text-muted">{order.complexity}</span></p>
              <p><strong>Quantity:</strong> <span className="text-muted">{order.quantity}</span></p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailsAdmin;