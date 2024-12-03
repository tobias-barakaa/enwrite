import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Pin } from 'lucide-react';

const HeroSection: React.FC = () => {
    return (
        <Container>
            <Row className="gy-3">
                <Col xs="auto" style={{ width: '400px' }}>
                    <div
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                            height: '200px',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#f5f5f5',
                                height: '40px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0 10px',
                                borderBottom: '1px solid #ccc',
                            }}
                        >
                            <span style={{ fontWeight: "bold" }}>Post</span>
                            <div>
                                <a href="#" style={{ marginRight: '10px' }}>
                                    Post a job
                                </a>
                                <Pin size={16} />
                            </div>
                        </div>

                        <div style={{ padding: '10px' }}>
                            <a style={{ display: 'block', marginBottom: '5px', fontWeight: "bold" }}>
                                Ready to Hire ?
                            </a>
                            <a href="#" style={{ display: 'block', marginBottom: '5px' }}>
                                Post a job
                            </a>
                            <a href="#" style={{ display: 'block', marginBottom: '5px' }}>
                                Need a writer? Start here
                            </a>
                        </div>
                    </div>
                </Col>

                <Col xs="auto" style={{ width: '400px' }}>
                    <div
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                            height: '200px',
                            
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#f5f5f5',
                                height: '40px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0 10px',
                                borderBottom: '1px solid #ccc',
                                
                            }}
                        >
                            <span style={{ fontWeight: "bold" }}>Manage</span>
                            <div>
                                <a href="#" style={{ marginRight: '10px', fontWeight: "bold" }}>
                                    My Managers
                                </a>
                                <Pin size={16} />
                            </div>
                        </div>

                        <div style={{ padding: '10px', color: '#9e9e9e' }}>
                            There are no jobs to manage or all jobs have been unpinned.
                        </div>
                    </div>
                </Col>

                <Col xs="auto" style={{ width: '400px' }}>
                    <div
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                            height: '200px',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#f5f5f5',
                                height: '40px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0 10px',
                                borderBottom: '1px solid #ccc',

                            }}
                        >
                            <span style={{ fontWeight: "bold" }}>Payments</span>
                            <div>
                                <a href="#" style={{ marginRight: '10px' }}>
                                    Create Invoice
                                </a>
                                <Pin size={16} />
                            </div>
                        </div>

                        <div style={{ padding: '10px', color: '#9e9e9e' }}>
                            There are no new invoices.
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default HeroSection;
