import React from 'react';
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HuczoI3O5RZUfSqWNriNnnNoplfnAetbM1fBmrliWguFV6PzvyiVdefHOzgnxOsEjl9aRLqHmdh0d8zCseIGZYB00QHGA4ycM';

   const  onToken = token => {
        console.log(token);
        alert(`Payment Successful`);
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name='Crown Clothing Ltd'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />

    )
};
export  default StripeCheckoutButton;