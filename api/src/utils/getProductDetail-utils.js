const { Product,Category } = require('../db.js')

const getProductDetail = async(req, res) => {
    try {
        const { idProduct } = req.params;
        const productDetail = await Product.findByPk(idProduct, {
            include: Category
        })
        if (!productDetail) throw Error("the product does not exist")
        res.send(productDetail)
    } catch (err) {
        res.status(404).send(`${err}`)
    }
}

module.exports = {
    getProductDetail
}