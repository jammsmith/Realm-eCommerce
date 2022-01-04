class Stripe {
  constructor (currentUser) {
    this.user = currentUser;
  }

  async getPaymentIntent () {
    try {
      return await this.user.functions.getPaymentIntent();
    } catch (err) {
      console.log('error in getPaymentIntent', err);
    }
  }
}

export default Stripe;
