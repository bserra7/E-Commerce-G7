const { Payment } = require("../db");

const getPayment = async (paymentId) => {
  const payment = await Payment.findOne({ where: { id_meli: paymentId }});

  if(!payment) throw Error("The payment doesn't exist")

  return payment;
};

module.exports = { getPayment };
