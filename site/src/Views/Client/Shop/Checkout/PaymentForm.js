import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import uniqueString from 'unique-string';

import ActionButton from '../../../../Components/ActionButton.js';
import ProgressSpinner from '../../../../Components/ProgressSpinner.js';
import Heading from '../../../../Components/Headings/Heading.js';
import UserMessage from '../../../../Components/UserMessage.js';
import SelectInput from '../../../../Components/Forms/SelectInput.js';
import useDDMutation from '../../../../hooks/useDDMutation.js';
import mutations from '../../../../graphql/mutations.js';
import { OrderContext } from '../../../../context/OrderContext.js';
import { CurrencyContext } from '../../../../context/CurrencyContext.js';
import { RealmAppContext } from '../../../../realmApolloClient.js';
import { getFreeDeliveryConstraints } from '../../../../helpers/offers.js';
import { isAuthenticated } from '../../../../helpers/auth.js';
import { getUpdatedObjectFields } from '../../../../helpers/global.js';
import { getDefaultAddress } from '../../../../helpers/address.js';

// Styled components
import { CheckoutItem, PaymentFormItems } from './StyledComponents.js';

const PaymentForm = ({
  deliveryDetails,
  additionalInfo,
  checkoutFormsComplete,
  updateCheckoutCompletion,
  updateOrder,
  paymentIntent,
  willCustomerPickUpInStore
}) => {
  const app = useContext(RealmAppContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const { activeOrder, deliveryZone } = useContext(OrderContext);

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [createAddress] = useDDMutation(mutations.CreateAddress);
  const [updateAddress] = useDDMutation(mutations.UpdateAddress);
  const [updateUserAddresses] = useDDMutation(mutations.UpdateUserAddresses);
  const [addDeliveryDetailsToOrder] = useDDMutation(mutations.AddDeliveryDetailsToOrder);
  const [addPickUpDetailsToOrder] = useDDMutation(mutations.AddPickUpDetailsToOrder);

  const handleSubmitPayment = async (e) => {
    try {
      e.preventDefault();

      if (deliveryDetails && deliveryDetails.address === '') {
        setErrorMessage('Please complete and confirm delivery details before submitting payment');
        return;
      }
      if (!stripe || !elements) return;

      setIsLoading(true);

      // Seperate address and delivery fields
      const addressFields = {
        line1: deliveryDetails.line1,
        line2: deliveryDetails.line2,
        city: deliveryDetails.city,
        county: deliveryDetails.county,
        postcode: deliveryDetails.postcode,
        country: deliveryDetails.country,
        isDefault: isAuthenticated(app.currentUser)
      };
      const deliveryFields = {
        firstName: deliveryDetails.firstName,
        lastName: deliveryDetails.lastName,
        email: deliveryDetails.email,
        phone: deliveryDetails.phone,
        price: deliveryDetails.price
      };

      // If delivering or currency has changed after payment intent was created then make sure
      // payment intent is updated with currency & correct amount (including delivery price)
      const toBeDelivered = !willCustomerPickUpInStore.current;

      // make sure payment intent is up-to-date with any changes
      const updatedTotals = await app.currentUser.functions.stripe_updatePaymentTotals(
        paymentIntent.id,
        activeOrder.orderItems,
        deliveryZone.current,
        currency,
        getFreeDeliveryConstraints()
      );
      deliveryFields.price = updatedTotals ? updatedTotals.deliveryTotal : 0;

      // Update additional order info
      const variables = { id: activeOrder._id, currency };

      if (additionalInfo && additionalInfo.length) {
        variables.extraInfo = additionalInfo;
      }
      await updateOrder({ variables });

      // Add delivery address details and update user if necessary
      let addressId = deliveryDetails.address_id || null;

      if (toBeDelivered) {
        if (!addressId || addressId === '') {
          // No address stored -> add a new address and assign to user if they're logged in
          const { data } = await createAddress({
            variables: {
              address_id: `address-${await uniqueString()}`,
              ...addressFields
            }
          });
          addressId = data.insertOneAddress.address_id;

          if (isAuthenticated(app.currentUser)) {
            const { dbUser } = app.currentUser;
            const { data } = await updateUserAddresses({
              variables: {
                id: dbUser._id,
                addresses: [addressId]
              }
            });
            await app.setCurrentUser(user => ({
              ...user,
              dbUser: data.updateOneUser
            }));
          }
        } else {
          // Address is stored -> update it if it's been changed during checkout
          const defaultAddress = getDefaultAddress(app.currentUser.dbUser.addresses);
          const { updatedFields, hasUpdatedFields } = getUpdatedObjectFields(defaultAddress, addressFields);

          if (hasUpdatedFields) {
            await updateAddress({
              variables: {
                address_id: addressId,
                ...updatedFields
              }
            });
          }
        }

        // Create a delivery with a link to the address and assign to the order
        await addDeliveryDetailsToOrder({
          variables: {
            order_id: deliveryDetails.order_id,
            delivery_id: deliveryDetails.delivery_id,
            address_id: addressId,
            ...deliveryFields
          }
        });
      } else {
        // Order will be collected -> still create the delivery but don't attach an address
        await addPickUpDetailsToOrder({
          variables: {
            order_id: deliveryDetails.order_id,
            delivery_id: deliveryDetails.delivery_id,
            firstName: deliveryDetails.firstName,
            lastName: deliveryDetails.lastName,
            email: deliveryDetails.email,
            phone: deliveryDetails.phone
          }
        });
      }

      // Confirm payment with Stripe
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/shop/checkout/summary'
        }
      });

      // This will only be reached if an error has occurred.  Show the error
      // in a message for the customer. Otherwise, customer is redirected to 'return_url'
      if (stripeError.type === 'card_error' || stripeError.type === 'validation_error') {
        setErrorMessage(stripeError.message);
      } else {
        setErrorMessage('An unexpected error occured.');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occured. Please contact Doves and Dandys');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrencySelection = (e) => {
    setCurrency(e.target.value);
  };

  const currencyOptions = [
    { name: 'British Pounds (£)', value: 'GBP' },
    { name: 'US Dollars ($)', value: 'USD' },
    { name: 'Euros (€)', value: 'EUR' }
  ];

  useEffect(() => {
    if (elements) {
      const paymentElement = elements.getElement('payment');
      paymentElement.on('change', (e) => {
        if (e.complete !== checkoutFormsComplete.paymentFormComplete) {
          updateCheckoutCompletion({
            paymentFormComplete: e.complete
          });
        }
      });
    }
  }, [elements, checkoutFormsComplete, updateCheckoutCompletion]);

  return (
    <CheckoutItem>
      <form>
        <Heading text='Payment Details' size='small' />
        <PaymentFormItems>
          <SelectInput
            name='currency-selection'
            value={currency}
            label='Select currency'
            handleChange={handleCurrencySelection}
            options={currencyOptions}
            variant='outlined'
          />
          <PaymentElement />
          {errorMessage && <UserMessage type='error' text={errorMessage} />}
        </PaymentFormItems>
        <div>
          <UserMessage
            type='warning'
            text='Clicking pay now will submit your payment'
          />
          <ActionButton
            text={isLoading ? <ProgressSpinner size='1.5rem' /> : 'pay now'}
            onClick={handleSubmitPayment}
            disabled={!stripe || !elements || !checkoutFormsComplete}
            fullWidth
            customStyles={!checkoutFormsComplete ? { opacity: 0.5 } : null}
          />
        </div>
      </form>
    </CheckoutItem>
  );
};

PaymentForm.propTypes = {
  deliveryDetails: PropTypes.object.isRequired,
  additionalInfo: PropTypes.string.isRequired,
  checkoutFormsComplete: PropTypes.bool.isRequired,
  updateCheckoutCompletion: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  paymentIntent: PropTypes.object.isRequired,
  willCustomerPickUpInStore: PropTypes.object.isRequired
};

export default PaymentForm;
