import React from 'react';

import Heading from '../../../../Components/Headings/Heading.js';

const DeliveryInfo = () => (
  <>
    <div>
      <Heading text='General Information' size='x-small' />
      <p>
          We accept orders and ship worldwide.  For all overseas orders, please e-mail your
          interest and we will be happy to advise on cost for postage & packing.
      </p>
      <p>
          We endeavour to find the best value method of postage, but will always make sure
          your order is covered by insurance. This is usually through Royal Mail. If you
          require a fast shipping method, we can provide you with UPS or FedEx prices on request.
      </p>
      <p>
          Should you have any questions about the merchandise, please do not hesitate to call or
          e-mail us. Our goal is to provide you with a personal service so that you are completely
          happy with your purchase.
      </p>
    </div>
    <div>
      <Heading text='Delivery Times' size='x-small' />
      <p>
          Under normal circumstances, delivery times for the UK are as stated for each item.
          Overseas orders are generally 4-6 weeks extra which will allow for a longer shipping period.
      </p>
      <p>
          None of the delivery times are set in stone. We will endeavour to get your
          order out to you as quickly as possible without compromising the quality of
          our workmanship. Each item is made to order and delivery times will depend on
          the back-log of work at that time. If you have any questions regarding
          delivery please do not hesitate to contact us.
      </p>

    </div>
    <div>
      <Heading text='Damaged Items' size='x-small' />
      <p>
        Damages from shipping must be reported to us within 24 hours of receipt of your goods. Please
        save all packing material for inspection. Third party damage is not covered by our guarantee. We
        do not accept damage caused by the customer.
      </p>
    </div>
  </>
);

export default DeliveryInfo;
