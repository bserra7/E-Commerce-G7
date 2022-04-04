require('dotenv').config();
const { SENDGRID_API_KEY } = process.env;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
const { Order, Product, product_order, User } = require('../db');

module.exports = {
    senderByDefault: () => {
        const message = {
        to: 'bnserra@gmail.com', // Change to your recipient
        from: 'noreply.ecommerce.g7@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun 2',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        sgMail
        .send(message)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    },
    orderCheckoutSender: async (orderId) => {
        let order = await Order.findAll({include: [Product, product_order, User]});
        order = order.find( order => order.id === parseInt(orderId))

        const message = {
            to: order.dataValues?.notification_email, // Change to your recipient
            from: 'noreply.ecommerce.g7@gmail.com', // Change to your verified sender
            dynamic_template_data:{
                name: order.dataValues?.user?.dataValues?.name,
                subject: 'Order confirmation',
                userId: order.dataValues?.user?.dataValues?.id,
                orderNumber: order.dataValues?.id,
                orderStatus: order.dataValues?.status,
                orderLink: `http://localhost:3000/user/account/order/detail/${order.dataValues?.id}`, // Change on DEPLOY
                orderDate: order.dataValues?.createdAt,
                orderSubtotal: order.dataValues?.total,
                orderTotal: order.dataValues?.total,
                salesTax: 'No fee',
                shippingCost: 'free',
                items: 'Electronic items',
                address: order.dataValues?.shipping_address,
                zipCode: order.dataValues?.shipping_zip_code,
                state: order.dataValues?.shipping_city
            },
            template_id: "d-30609f88c0be4b998e5028c35faf7472"
        }
            sgMail
            .send(message)
            .then(() => {
                console.log('New Order Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
    },
    orderStatusChange: (status, order) => {
        const message = {
            to: order.dataValues?.notification_email, // Change to your recipient
            from: 'noreply.ecommerce.g7@gmail.com', // Change to your verified sender
            dynamic_template_data:{
                name: order.dataValues?.user?.name,
                subject: 'Order status changed',
                orderNumber: order.dataValues?.id,
                orderStatus: status,
                orderLink: `http://localhost:3000/user/account/order/detail/${order.dataValues?.id}`, // Change on DEPLOY!!!
            },
            template_id: "d-1fc934cfce0d43ddba13dcdc84086414"
        }
        sgMail
        .send(message)
        .then(() => {
            console.log('Status changed Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    },
    PaymentStatusApproved: (status, order) => {
        const message = {
            to: order.dataValues?.notification_email, // Change to your recipient
            from: 'noreply.ecommerce.g7@gmail.com', // Change to your verified sender
            dynamic_template_data:{
                name: order.dataValues?.user?.name,
                subject: 'Your payment was Approved',
                orderNumber: order.dataValues?.id,
                paymentStatus: status,
                orderLink: `http://localhost:3000/user/account/order/detail/${order.dataValues?.id}`, // Change on DEPLOY!!!
            },
            template_id: "d-a74d4c27ca9340649c8eaa782afce65d"
        }
        sgMail
        .send(message)
        .then(() => {
            console.log('Payment status approved Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    },
    PaymentStatusRejected: (status, order) => {
        const message = {
            to: order.dataValues?.notification_email, // Change to your recipient
            from: 'noreply.ecommerce.g7@gmail.com', // Change to your verified sender
            dynamic_template_data:{
                name: order.dataValues?.user?.name,
                subject: 'Your payment was Rejected',
                orderNumber: order.dataValues?.id,
                paymentStatus: status,
                paymentLink: order.dataValues?.payment_link, 
            },
            template_id: "d-6c6890978b7542099432e77af3b03bb8"
        }
        sgMail
        .send(message)
        .then(() => {
            console.log('Payment status rejected Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    },
    PaymentStatusPending: (status, order) => {
        const message = {
            to: order.dataValues?.notification_email, // Change to your recipient
            from: 'noreply.ecommerce.g7@gmail.com', // Change to your verified sender
            dynamic_template_data:{
                name: order.dataValues?.user?.name,
                subject: 'Your payment was Canceled',
                orderNumber: order.dataValues?.id,
                paymentStatus: status,
                paymentLink: order.dataValues?.payment_link, 
            },
            template_id: "d-6c6890978b7542099432e77af3b03bb8"
        }
        sgMail
        .send(message)
        .then(() => {
            console.log('Payment status canceled Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    },
    TwoFaVerificationCode: (user, code) => {
        const message = {
            to: user.dataValues.email, // Change to your recipient
            from: 'noreply.ecommerce.g7@gmail.com', // Change to your verified sender
            subject: '2FA Authentication Code',
            text: `Hi ${user.dataValues.name}, please use next code to authenticate in our system CODE: ${code}`,
            html: `Hi ${user.dataValues.name}, please use next code to authenticate in our system <h2><strong>CODE: ${code}</strong><h2>`,
            }
            sgMail
            .send(message)
            .then(() => {
                console.log('2FA Code email sent')
            })
            .catch((error) => {
                console.error(error)
            })
    }
}