import React, { useState } from 'react';
import { Container, Table, Badge, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  items: InvoiceItem[];
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

const InvoiceComponent: React.FC = () => {
  const [loader, setLoader] = useState(false);

  // Sample static data
  const invoice: Invoice = {
    id: 'INV-2024-001',
    date: '2024-03-20',
    dueDate: '2024-04-20',
    amount: 1250.00,
    status: 'pending',
    description: 'Content Writing Services - March 2024',
    items: [
      {
        id: '1',
        description: 'Blog Articles (2000 words)',
        quantity: 5,
        rate: 200,
        amount: 1000
      },
      {
        id: '2',
        description: 'SEO Optimization',
        quantity: 1,
        rate: 250,
        amount: 250
      }
    ]
  };

  const getStatusBadge = (status: Invoice['status']) => {
    const variants = {
      paid: 'success',
      pending: 'warning',
      overdue: 'danger'
    };
    return <Badge bg={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  const downloadPdf = () => {
    const capture = document.querySelector('.download-pdf');
    setLoader(true);
  
    html2canvas(capture, {
      scale: 2, // Increase scale for better quality
      useCORS: true, // Ensure cross-origin images are fetched properly
      logging: true, // Optionally log for debugging
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      const componentWidth = pdf.internal.pageSize.getWidth();
      
      // Scale the canvas to fit the PDF size
      const imgWidth = componentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;


  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  
      setLoader(false);
      pdf.save('invoice.pdf');
    });
  };
  

  return (
    <Container className="py-4">
      <div className='download-pdf'>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5>Invoice #{invoice.id}</h5>
          <div>{getStatusBadge(invoice.status)}</div>
        </div>

        <div className="border rounded p-4 mb-4 bg-light">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-1"><strong>Issue Date:</strong> {invoice.date}</p>
              <p className="mb-1"><strong>Due Date:</strong> {invoice.dueDate}</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-1"><strong>Total Amount:</strong> ${invoice.amount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h6>Items</h6>
          <Table responsive bordered hover>
            <thead className="bg-light">
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>${item.rate.toFixed(2)}</td>
                  <td>${item.amount.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="fw-bold">
                <td colSpan={3} className="text-end">Total</td>
                <td>${invoice.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        {/* Pass downloadPdf function as a reference */}
        <Button variant="outline-secondary" onClick={downloadPdf}>Download PDF</Button>
        <Button variant="primary">Pay Now</Button>
      </div>
    </Container>
  );
};

export default InvoiceComponent;
