const { Product, Wishlist } = require('../db.js');

module.exports = {
    getWishlist : async (userId) => {
    let userWishlist = await Wishlist.findAll({ where: {userId} });

    userWishlist = userWishlist.map(prod => prod.dataValues.productId)
    
    const products = userWishlist.map(key => Product.findByPk(key));

    const results = await Promise.all(products);
    
    return results;
    },
    setWishlist: async (userId, productId) => {
        if(!userId || !productId) throw Error ('Missing userId or productId');
        const [existent, added] = await Wishlist.findOrCreate({
            where: { userId, productId },
            defaults: {
                userId,
                productId
            }
        });
        if(added) return "Relation added";
        else return
    },
    removeFromWishlist: async (userId, productId) => {
        if(!userId || !productId) throw Error ('Missing userId or productId');
        const productDeleted = await Wishlist.destroy({
            where:{
                userId,
                productId
            }
        })
        console.log(productDeleted);
        if(!productDeleted) throw Error ("Product can't be deleted from Wishlist")
        return "Product deleted from User Wishlist successfully";
    }
}
