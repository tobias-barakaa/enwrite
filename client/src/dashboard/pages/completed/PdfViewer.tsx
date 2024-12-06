import React from 'react';

interface PdfContent {
  title: string;
  fileUrl: string;
  content: string;
}

interface Props {
  pdfContent: PdfContent[]; // This should match the data structure you provided
  isLoading: boolean;
  isError: boolean;
}

const PdfViewer: React.FC<Props> = ({ pdfContent, isLoading, isError }) => {
    if (isLoading) {
      return <p>Loading PDF content...</p>;
    }
  
    if (isError) {
      return <p>Error loading PDF content. Please try again later.</p>;
    }
  
    if (!Array.isArray(pdfContent) || pdfContent.length === 0) {
      return <p>No PDF content available.</p>;
    }
  
    return (
      <div>
        <h1>Uploaded PDFs</h1>
        {pdfContent.map((pdf, index) => (
          <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{pdf.title}</h2>
            <a href={pdf.fileUrl} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
            <h3>Extracted Content:</h3>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{pdf.content}</pre>
          </div>
        ))}
      </div>
    );
  };
  

export default PdfViewer;
