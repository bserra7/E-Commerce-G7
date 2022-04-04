const { Product, Visited_product } = require('../db.js');

module.exports = {
    getVisited : async (userId) => {
    let visitedProducts = await Visited_product.findAll({ where: {userId} });

    visitedProducts = visitedProducts.map(vProd => vProd.dataValues.productId)
    
    const products = visitedProducts.map(key => Product.findByPk(key));

    const results = await Promise.all(products);
    
    return results;
    },
    postVisited: async (userId, productId) => {
        if(!userId || !productId) throw Error ('Missing userId or productId');
        const [existent, added] = await Visited_product.findOrCreate({
            where: { userId, productId },
            defaults: {
                userId,
                productId
            }
        });
        if(added) return "Relation added";
        else return
    }
}
