import React, { useState } from 'react';
import { Container, Table, Badge, Button, Spinner } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useInvoiceQuery } from '../../../../slices/orderApiSlice'; // Adjust import path as needed

const InvoiceComponent: React.FC = () => {
  const [loader, setLoader] = useState(false);

  // Fetch invoices dynamically
  const { data, isLoading, error } = useInvoiceQuery({});
  const invoices = data?.invoices; // Safely access the invoices array

  // Debug logs for lifecycle
  console.log('Invoices Data:', { isLoading, error, invoices });

  // Handle badge rendering for payment status
  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      Paid: 'success',
      Pending: 'warning',
      Overdue: 'danger',
    };
    return <Badge bg={variants[status] || 'secondary'}>{status.toUpperCase()}</Badge>;
  };

  // Handle PDF download for a specific invoice
  const downloadPdf = (invoiceId: string) => {
    const capture = document.querySelector(`#invoice-${invoiceId}`);
    setLoader(true);

    if (!capture) {
      setLoader(false);
      return;
    }

    html2canvas(capture as HTMLElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      setLoader(false);
      pdf.save(`invoice-${invoiceId}.pdf`);
    });
  };

  // Loading state
  if (isLoading) return <Spinner animation="border" className="d-block mx-auto" />;

  // Error or empty data handling
  if (error || !invoices?.length) {
    return (
      <Container className="py-4">
        <p className="text-danger text-center">No invoices found or failed to fetch data.</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {invoices.map((invoice) => (
        <div key={invoice.id} id={`invoice-${invoice.id}`} className="mb-5 border rounded p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5>Invoice #{invoice.invoice_number}</h5>
            <div>{getStatusBadge(invoice.payment_status)}</div>
          </div>

          <div className="border rounded p-3 mb-4 bg-light">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Description:</strong> {invoice.description}</p>
                <p><strong>Quantity:</strong> {invoice.quantity}</p>
              </div>
              <div className="col-md-6 text-md-end">
                <p><strong>Amount:</strong> ${parseFloat(invoice.amount).toFixed(2)}</p>
                <p><strong>Status:</strong> {invoice.order_status}</p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" onClick={() => downloadPdf(invoice.id)}>
              {loader ? 'Downloading...' : 'Download PDF'}
            </Button>
            <Button variant="primary">Pay Now</Button>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default InvoiceComponent;
