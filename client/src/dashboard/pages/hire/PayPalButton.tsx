// src/components/PayPalButton.tsx
import React from 'react';
// import { PayPalButton as PaypalButton } from "";
import { PayPalButtons as PaypalButton, PayPalScriptProvider } from '@paypal/react-paypal-js';


interface PayPalButtonProps {
    amount: string;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount }) => {
    const onSuccess = (details: any) => {
        alert("Transaction completed by " + details.payer.name.given);
        // Optionally, handle the post-payment logic here
    };

    const onError = (err: any) => {
        console.error("Payment Error: ", err);
    };

    return (
        <PaypalButton
            amount={amount}
            // Replace with your PayPal client ID
            options={{
                clientId: "YOUR_PAYPAL_CLIENT_ID",
            }}
            onSuccess={onSuccess}
            onError={onError}
        />
    );
};

export default PayPalButton;