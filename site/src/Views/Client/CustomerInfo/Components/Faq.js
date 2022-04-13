import React from 'react';

const Faq = () => (
  <>
    <div>
      <p><strong>Is it safe to order on line?</strong></p>
      <p>
        Yes, Doves and Dandy's is an SSL secure site. We use Stripe to process our online
        payments which is an industry standard and extremely secure.  We don't save your
        card details anywhere.
      </p>
    </div>
    {/*
      <div>
        <p><strong>How do I place an order?</strong></p>
        <p>
          If the item is in stock, simply add to your cart and complete the checkout process
        </p>
      </div>
    */}
    <div>
      <p><strong>Can I give my preferences when ordering?</strong></p>
      <p>
        Yes, when you are going through the checkout procedure, there is an information box
        for you to insert your request here. So you don't need to send a separate message.
      </p>
    </div>
    <div>
      <p><strong>How do I know what measurements are needed for the item I have purchased?</strong></p>
      <p>
        Once your order is placed, we will send you an easy measurement chart and a list of the measurements
        required for your item.
      </p>
    </div>
    <div>
      <p><strong>Can I order if I don't live in the UK?</strong></p>
      <p>
        Yes you can. We have sent our products all over the world.  Just let us know where it is going as this
        is a slightly different procedure. If you have found an item you would like to order, please contact us
        by email.  We can work out a price including shipping and you can pay via Paypal.
      </p>
    </div>
    <div>
      <p><strong>Can I make a part payment?</strong></p>
      <p>
        You can make a part payment by arrangement prior to ordering. This is done by using a PayPal invoice.
        The deposit amount is a minimum of 50%. The balance will to paid before dispatch.
      </p>
    </div>
    <div>
      <p><strong>What happens if my measurements are wrong?</strong></p>
      <p>
        Contact us immediately if you know you have made a mistake. We work with the information and measurements
        provided by you, the customer. If the information is wrong, this is the customers responsibility and any
        alterations may be charged.
      </p>
    </div>
  </>
);

export default Faq;
