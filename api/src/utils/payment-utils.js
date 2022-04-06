const { Payment } = require("../db");

const getPayment = async (paymentId) => {
  const payment = await Payment.findOne({ where: { id_meli: paymentId }});

  if(!payment) throw Error("The payment doesn't exist")

  return payment;
};

const getAllPayments = async () => {
  const payments = await Payment.findAll();

  if(!payments) throw Error("There's no payments on DB")

  return payments;
};

module.exports = { getPayment, getAllPayments };
