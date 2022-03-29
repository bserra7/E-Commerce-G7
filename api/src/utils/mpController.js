const mercadopago = require("mercadopago");
const { Payment, Order } = require('../db')
const axios = require('axios');
const { orderStatusChange } = require('./emailSender');

module.exports = {
    createOrderMP: async (req, res) => {
        const { products, orderId } = req.body
        mercadopago.configure({
        access_token: process.env.MP_ACCESS_TOKEN,
        });
    
        // Crea un objeto de preferencia
        let preference = {
            items: products?.map(product => ({
                title: product.name,
                unit_price: product.price,
                quantity: product.amount
            })),
            back_urls:{
                failure: `${process.env.REDIRECT_MP}/payment/failure`,
                pending: `${process.env.REDIRECT_MP}/payment/pending`,
                success: `${process.env.REDIRECT_MP}/payment/success`
            },
            external_reference: orderId.toString(),
            auto_return: 'approved',
                              //localhost:3001/notification
            notification_url: `${process.env.NOTIFICATION_MP}/notification`,
        };
        mercadopago.preferences.create(preference)
        .then(response => {
            res.json(response)
        }, err => console.log(err))
    },
    notificationOrder: async (req, res) => {
        const data = req.query;
        const config = {
            headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
        };
        res.status(200);       
        if(data['data.id']){
            const infoPayment = await axios.get(`https://api.mercadopago.com/v1/payments/${data['data.id']}`, config)
            try {
                if(infoPayment.data.status === 'approved' && infoPayment.data.external_reference){
                    const [payment, newPayment] = await Payment.findOrCreate({
                        where: { id_meli: infoPayment.data.id },
                        defaults: {
                        id_meli: infoPayment.data.id,
                        card_expiration_month: infoPayment.data.card.expiration_month,
                        card_expiration_year: infoPayment.data.card.expiration_year,
                        card_first_six_digits: infoPayment.data.card.first_six_digits,
                        card_last_four_digits: infoPayment.data.card.last_four_digits,
                        description: infoPayment.data.description,
                        installments: infoPayment.data.installments,
                        money_release_date: infoPayment.data.money_release_date,
                        payment_method_id: infoPayment.data.payment_method_id,
                        payment_type_id: infoPayment.data.payment_type_id,
                        status: infoPayment.data.status,
                        installment_amount: infoPayment.data.transaction_details.installment_amount,
                        net_received_amount: infoPayment.data.transaction_details.net_received_amount,
                        total_paid_amount: infoPayment.data.transaction_details.total_paid_amount,
                        orderId: infoPayment.data.external_reference
                    }})
                    if(newPayment){
                        const order = await Order.findByPk(infoPayment.data.external_reference);
                        if(!order) throw Error('Order not found');
                        order.status = 'processing';
                        order.save();
                        orderStatusChange("processing", order)
                    }
                }             
                res.sendStatus(201);
            } catch (err) {
                console.log(err);
            }
        }
    }
} 