exports = async function (orderItems, deliveryZone, currency) {
  try {
    if (!orderItems || !orderItems.length) {
      return;
    }
    const allowableZones = ['uk', 'europe', 'usa'];
    if (!deliveryZone || !allowableZones.includes(deliveryZone.toLowerCase())) {
      return;
    }

    const totalProductWeights = [];
    for (const orderItem of orderItems) {
      const productWeight = orderItem.quantity * orderItem.product.weightInGrams;
      totalProductWeights.push(productWeight);
    }
    console.log('totalProductWeights', totalProductWeights);

    const totalOrderWeight = totalProductWeights.reduce((a, b) => a + b);
    console.log('totalOrderWeight', totalOrderWeight);

    const prices = {
      level1: {
        uk: { gbp: 5, eur: 6, usd: 7 },
        europe: { gbp: 10, eur: 12, usd: 13 },
        usa: { gbp: 15, eur: 18, usd: 20 }
      },
      level2: {
        uk: { gbp: 10, eur: 12, usd: 13 },
        europe: { gbp: 25, eur: 30, usd: 35 },
        usa: { gbp: 30, eur: 36, usd: 40 }
      },
      level3: {
        uk: { gbp: 20, eur: 25, usd: 26 },
        europe: { gbp: 35, eur: 40, usd: 45 },
        usa: { gbp: 45, eur: 55, usd: 60 }
      }
    };

    const paymentCurrency = currency.toLowerCase();

    if (totalOrderWeight <= 1000) {
      return prices.level1[deliveryZone][paymentCurrency];
    } else if (totalOrderWeight <= 3000) {
      return prices.level2[deliveryZone][paymentCurrency];
    } else {
      return prices.level3[deliveryZone][paymentCurrency];
    }
  } catch (err) {
    console.log(err);
  }
};
