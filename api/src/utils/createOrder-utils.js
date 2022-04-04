const { Order, Product } = require("../db");

const postOrder = async (order) => {
  if (!order.products.length) throw Error("there are no products in the order");
  if (!order.userId) throw Error("user id is required");

  const newOrder = await Order.create({
    total: order.total,
    userId: order.userId,
    notification_email: order.email,
    shipping_address: order.address,
    shipping_city: order.city,
    shipping_zip_code: order.zip_code
  });

  const product_order = await Promise.all(
    order.products.map((product) => {
      Product.findOne({ where: { id: product.id } }).then((produc) => {
          produc.stock = produc.stock - product.amount;
          produc.save();
          return newOrder.addProduct(produc, { through: { amount: product.amount } }
        )}
      );
    })
  );

  return newOrder;
};

module.exports = { postOrder };
