class Stripe {
  constructor (currentUser) {
    this.user = currentUser;
  }

  async stripeFunc (args) {
    try {
      return await this.user.functions.stripe(args);
    } catch (err) {
      console.log('error in useRealmFunction', err);
    }
  }
}

export default Stripe;
