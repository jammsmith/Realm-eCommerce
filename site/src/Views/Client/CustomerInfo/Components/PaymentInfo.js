import React from 'react';

import Heading from '../../../../Components/Headings/Heading.js';

const PaymentInfo = () => (
  <>
    <div>
      <Heading text='Card Payments' size='x-small' />
      <p>
        We accept credit and debit card payments on our online store in either GBP,
        USD or EUR currencies - just make sure to select the correct option during payment.
        If you would like to pay in a different currency, please contact us for a custom quote.
      </p>
    </div>
    <div>
      <Heading text='Other Payment Methods' size='x-small' />
      <p>
        We also accept PayPal as well as personal and bank cashier's checks made payable to
        <strong> Doves & Dandy's</strong>. Funds must be cleared prior to goods being dispatched.
        With deposit checks, work will not be scheduled until funds are cleared.
      </p>
    </div>
  </>
);

export default PaymentInfo;
