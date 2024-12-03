import ReactPDF from '@react-pdf/renderer';
import InvoiceComponent from './Invoice';

// ReactPDF.render(<InvoiceComponent />, `${__dirname}/example.pdf`);
ReactPDF.renderToStream(<InvoiceComponent />);
