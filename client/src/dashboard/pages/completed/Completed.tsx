import React, { useState } from "react";
import { format } from "date-fns";
import {
  useGetCompletedOrdersQuery} from "../../../slices/admin/adminOrderApiSlice";
import styled from "styled-components";
import {
  Card,
  Row,
  Col,
  Button,
  Container,
  Spinner,
  Dropdown,
  Badge,
} from "react-bootstrap";



const Completed: React.FC = () => {
  const [satisfaction, setSatisfaction] = useState<string>(
    "Select Satisfaction"
  );
  const { data: response, isLoading, isError } = useGetCompletedOrdersQuery({});

  const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  `;

  const StyledCardHeader = styled(Card.Header)`
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
    color: #333;
  `;

  const StyledButton = styled(Button)`
    height: 50px;
    background-color: ${(props) => {
      if (props.variant === "outline-danger") return "white";
      if (props.variant === "outline-check") return "white";
      return "#f5f5f5";
    }};
    border: 1px solid
      ${(props) => {
        if (props.variant === "outline-danger") return "#dc3545";
        if (props.variant === "outline-check") return "#666";
        return "#e0e0e0";
      }};
    color: ${(props) => {
      if (props.variant === "outline-danger") return "#dc3545";
      if (props.variant === "outline-check") return "#666";
      return "#333";
    }};

    &:hover {
      background-color: ${(props) => {
        if (props.variant === "outline-danger") return "#dc3545";
        if (props.variant === "outline-check") return "#666";
        return "#e0e0e0";
      }};
      color: ${(props) => {
        if (props.variant === "outline-danger") return "white";
        if (props.variant === "outline-check") return "white";
        return "#333";
      }};
    }
  `;

  const StyledDropdownToggle = styled(Dropdown.Toggle)`
    height: 50px;
    background-color: white !important;
    border: 1px solid #666 !important;
    color: #333 !important;

    &:hover {
      background-color: #666 !important;
      color: white !important;
    }
  `;

  const downloadPDF = async () => {
    try {
      const letme = response?.data?.[0]?.file_url;
      if (!letme) throw new Error("Failed to fetch the PDF");

      // Renamed to fetchResponse to avoid conflict
      const fetchResponse = await fetch(letme);
      const blob = await fetchResponse.blob();

      const urlObject = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlObject;
      link.download = "document.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };


  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
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
    <Container className="py-4">
      <Row>
        {response?.data.map((order: { file_id: string; status: string; title: string; created_at: string; description: string; word_count: number; duration: string; cost: number; language: string; complexity: string; file_url: string; pdfContent: string; }) => (
          <Row key={order.file_id} className="mb-4">
            <Col md={7} className="mx-auto">
              <Card
                className="border-0"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  backgroundColor: "#fafafa",
                }}
              >
                <Card.Header
                  className="d-flex justify-content-between align-items-center py-3"
                  style={{
                    background: "#2c3e50",
                    borderBottom: "none",
                  }}
                >
                  <h5 className="mb-0 text-white">Order Details</h5>
                  <Badge
                    bg={
                      order.status.toLowerCase() === "pending"
                        ? "warning"
                        : "success"
                    }
                    style={{ padding: "8px 12px", borderRadius: "20px" }}
                  >
                    {order.status}
                  </Badge>
                </Card.Header>

                <Card.Body className="p-4">
                  <Row className="mb-4">
                    <Col md={6}>
                      <h6
                        className="text-muted mb-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Title
                      </h6>
                      <p className="mb-0" style={{ color: "#2c3e50" }}>
                        {order.title}
                      </p>
                    </Col>
                    <Col md={6}>
                      <h6
                        className="text-muted mb-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Created At
                      </h6>
                      <p className="mb-0" style={{ color: "#2c3e50" }}>
                        {format(new Date(order.created_at), "PPP")}
                      </p>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col>
                      <h6
                        className="text-muted mb-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Description
                      </h6>
                      <p className="mb-0" style={{ color: "#2c3e50" }}>
                        {order.description}
                      </p>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    {[
                      { label: "Word Count", value: order.word_count },
                      { label: "Duration", value: order.duration },
                      { label: "Cost", value: `$${order.cost}` },
                    ].map((item, index) => (
                      <Col md={4} key={index}>
                        <div
                          className="p-3 rounded"
                          style={{
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #eee",
                          }}
                        >
                          <h6
                            className="text-muted mb-2"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {item.label}
                          </h6>
                          <p
                            className="mb-0 fw-semibold"
                            style={{ color: "#2c3e50" }}
                          >
                            {item.value}
                          </p>
                        </div>
                      </Col>
                    ))}
                  </Row>

                  <Row className="mb-4">
                    {[
                      { label: "Language", value: order.language },
                      { label: "Complexity", value: order.complexity },
                    ].map((item, index) => (
                      <Col md={6} key={index}>
                        <div
                          className="p-3 rounded"
                          style={{
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #eee",
                          }}
                        >
                          <h6
                            className="text-muted mb-2"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {item.label}
                          </h6>
                          <p
                            className="mb-0 fw-semibold"
                            style={{ color: "#2c3e50" }}
                          >
                            {item.value}
                          </p>
                        </div>
                      </Col>
                    ))}
                  </Row>

                  <Button
                    variant="dark"
                    href={order.file_url}
                    target="_blank"
                    className="w-100 mt-3"
                    style={{
                      backgroundColor: "#2c3e50",
                      border: "none",
                      padding: "12px",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    View Delivered File
                  </Button>
                </Card.Body>
              </Card>
            </Col>

          

            <Col md={5}>
              <StyledCard className="h-100">
                <StyledCardHeader>
                  <h5 className="mb-0">Feedback</h5>
                </StyledCardHeader>
                <Card.Body className="d-flex flex-column">
                  <textarea
                    value={order.pdfContent}
                    readOnly
                    className="w-full min-h-[500px] p-4 rounded-lg border border-gray-200 focus:outline-none"
                    style={{ height: "280px", width: "420px" }}
                  />

                  <div
                    className="d-flex flex-column gap-2"
                    style={{ marginTop: "49px" }}
                  >
                    <StyledButton
                      variant="outline-secondary"
                      className="w-100"
                      onClick={downloadPDF}
                    >
                      Download All
                    </StyledButton>

                    <div className="d-flex gap-2">
                      <Dropdown className="flex-grow-1">
                        <StyledDropdownToggle className="w-100">
                          {satisfaction}
                        </StyledDropdownToggle>
                        <Dropdown.Menu className="w-100">
                          <Dropdown.Item
                            onClick={() => setSatisfaction("Satisfied")}
                          >
                            Satisfied
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setSatisfaction("Not Satisfied")}
                          >
                            Not Satisfied
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      <StyledButton
                        variant="outline-danger"
                        className="flex-grow-1"
                      >
                        Delete
                      </StyledButton>

                      <StyledButton
                        variant="outline-check"
                        className="flex-grow-1"
                        onClick={() =>
                          (window.location.href =
                            "https://alexawriters.com/aichecker")
                        }
                      >
                        Check AI
                      </StyledButton>
                    </div>

                    <StyledButton variant="outline-secondary" className="w-100">
                      Send Satisfaction
                    </StyledButton>
                  </div>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default Completed;
