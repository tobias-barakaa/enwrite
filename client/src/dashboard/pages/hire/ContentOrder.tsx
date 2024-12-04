import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from '../../../slices/orderApiSlice';
import { Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap';
import { PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js';
import { OnApproveData, OnApproveActions } from "@paypal/paypal-js";

import { useState } from 'react';
import { BrickWall, Languages, NotebookTabs, ShipWheel, TimerIcon, WrapText } from 'lucide-react';
import { toast } from 'react-toastify';
import { PaypalDetails } from '../../../slices/orderApiSlice';
import './ContentOrder.css'; 




const ContentOrder: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderQuery(id || '');
  const [showDetails, setShowDetails] = useState(false);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
   


  const { data: paypal, isLoading: loadingPayPal } = useGetPayPalClientIdQuery({});


 
  function createOrder(_: unknown, actions: { order: { create: (data: { intent: "CAPTURE"; purchase_units: { amount: { currency_code: string; value: string } }[]; description: string }) => Promise<string> } }) {
    if (!data?.order) {
      throw new Error('Order data is not available');
    }
  
    const { cost, quantity, id } = data.order;
    const parsedCost = parseFloat(cost.toString());
    const parsedQuantity = parseInt(quantity.toString(), 10);
  
    console.log('Creating PayPal order with:', {
      parsedCost,
      parsedQuantity,
      total: parsedCost * parsedQuantity,
    });
  
    if (isNaN(parsedCost) || parsedCost <= 0 || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      throw new Error('Invalid cost or quantity provided for the order.');
    }
  
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (parsedCost * parsedQuantity).toFixed(2),
          },
        },
      ],
      description: `Order #${id}`,
    });
    
  }

  
  
  
  async function onApprove(_: OnApproveData, actions: OnApproveActions) {
    if (!actions?.order) {
      throw new Error('PayPal order actions are not available');
    }
  
    try {
      const details = await actions.order.capture();
      console.log('Payment captured successfully:', details);
  
      const paymentDetails = {
        transactionId: details.id,  // PayPal transaction ID
        status: details.status,
        amount: parseFloat(details.purchase_units?.[0]?.amount?.value || '0'),
        email: details.payer?.email_address || '',  
        payerId: details.payer?.payer_id || '',  
      };
  
      console.log('Formatted payment details:', paymentDetails);
  
      await payOrder({
        orderId: id || '',
        details: paymentDetails as PaypalDetails,
      }).unwrap();
  
      toast.success('Payment completed successfully!');
  
      window.location.reload(); 
  
    } catch (error) {
      console.error('Error capturing payment:', error);
      toast.error(
        error instanceof Error ? error.message : 'An error occurred while processing the payment.'
      );
    }
  }
  
  
  
  
  


function onError(error: { message?: string }) {
  console.error('PayPal error:', error);
  toast.error(error?.message || 'An error occurred with PayPal');
}




  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ clientId: paypal?.clientId || "", currency: "USD" }}>
    <Container fluid className="p-4  min-vh-100">
        <div className="max-w-7xl mx-auto">
          {/* Order Header */}
          <div className="mb-4">
            <h2 className="text-3xl font-semibold text-gray-800">Order Summary</h2>
            <p className="text-gray-600">Order ID: {data?.order.id}</p>
          </div>

          <Row className="g-4" >
            {/* Main Content Card */}
            <Col lg={8} >
              <Card className="shadow-sm rounded-lg overflow-hidden" style={{  border: "1px solid #ccc" }}>
                <Card.Header className="bg-white border-bottom p-4" >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="h4 mb-1">{data?.order.title}</h3>
                      <p className="text-muted mb-0">{data?.order.content_type}</p>
                    </div>
                    <Badge 
                      bg={data?.order.is_paid ? 'success' : 'warning'} 
                      className="px-3 py-2 rounded-pill"
                    >
                      {data?.order.is_paid ? 'Paid' : 'Pending Payment'}
                    </Badge>
                  </div>
                </Card.Header>

                <Card.Body className="p-4">
                  {/* Order Details Grid */}
                  <div className="row g-4">
                    <div className="col-md-6">
                      <DetailItem 
                        icon=<NotebookTabs />
                        label="Description" 
                        value={data?.order.description} 
                      />
                      <DetailItem 
                        icon=<TimerIcon />
                        label="Duration" 
                        value={data?.order.duration}
                      />
                      <DetailItem 
                        icon=<Languages />
                        label="Language" 
                        value={data?.order.language}
                      />
                    </div>
                    <div className="col-md-6">
                      <DetailItem 
                        icon=<WrapText />
                        label="Keywords" 
                        value={data?.order.keywords}
                      />
                      <DetailItem 
                        icon=<BrickWall /> 
                        label="Quantity" 
                        value={data?.order.quantity.toString()}
                      />
                      <DetailItem 
                        icon=<ShipWheel />
                        label="Created" 
                        value={new Date(data?.order.created_at || '').toLocaleDateString()}
                      />
                    </div>
                  </div>

                  {/* Expandable Technical Details */}
                  <div className="mt-4">
                    <button
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => setShowDetails(!showDetails)}
                    >
                      {showDetails ? '▼' : '▶'} Technical Details
                    </button>
                    {showDetails && (
                      <div className="mt-3 bg-light p-3 rounded">
                        <small className="d-block mb-2">
                          <strong>Order ID:</strong> {data?.order.id}
                        </small>
                        <small className="d-block">
                          <strong>System Message:</strong> {data?.message}
                        </small>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Payment Card */}
            <Col lg={4}>
              <Card className=" shadow-sm rounded-lg" style={{  border: "1px solid #ccc" }}>
                <Card.Body className="p-4">
                  <h4 className="mb-4">Payment Details</h4>
                  
                  <div className="bg-light p-4 rounded mb-4">
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Base Price</span>
                      <span className="fw-semibold">${data?.order.cost}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Quantity</span>
                      <span className="fw-semibold">×{data?.order.quantity}</span>
                    </div>
                    <hr className="my-3" />
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Total</span>
                      <span className="fw-bold text-primary">
                        ${(parseFloat(data?.order.cost?.toString() || '0') * (data?.order.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {!data?.order.is_paid && (
                    <div>
                      {loadingPay && loadingPayPal}
                      
                        <div>
                         
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}></PayPalButtons>
                          </div>
                        </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
    </Container>
    </PayPalScriptProvider>
  );
};

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value?: string }> = ({ 
  icon, 
  label, 
  value 
}) => (
  <div className="mb-3">
    <div className="d-flex align-items-center mb-1">
      <span className="me-2">{icon}</span>
      <small className="text-muted">{label}</small>
    </div>
    <div className="ps-4">
      <span className="fw-semibold">{value || '-'}</span>
    </div>
  </div>
);

export default ContentOrder;
