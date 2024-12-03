import React from 'react';

const WarningMessage: React.FC = () => {
  return (
    <div 
      className="w-100 p-3 mb-4" 
      style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        fontSize: '0.875rem',
        color: '#495057'
      }}
    >
      Orders can only be deleted or edited within 30mins of creation...
    </div>
  );
};

export default WarningMessage;