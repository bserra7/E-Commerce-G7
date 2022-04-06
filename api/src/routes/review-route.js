const { Router } = require("express");
const { newReview } = require("../utils/newReview-utils");
const { Review, Product } = require('../db');
const review = Router();

review.post('/', async (req, res) => {
    const { review, rate, userId, productId } = req.body;
    if(!review || !userId || !productId || !rate) return res.status(403).json('Review, rate, userId or productId missing');
    if(typeof userId !== 'number' || typeof rate !== 'number') return res.status(403).json('Check typeof "userId" and "rate" must be INTEGER');
    try {
        await newReview(review, rate, userId, productId);
        res.json('Review added correctly');
    } catch (error) {
        res.status(403).json('Error ocurred: '+ error)
    }
})

review.delete('/', async (req, res) => {
    const { userId, productId } = req.body;
    if(!userId || !productId) return res.status(403).json('userId or productId missing');
    try {
        const deleted = await Review.destroy({
            where: {
                userId,
                productId
            }
        })
        if(!deleted) throw Error("Review not deleted")

        const productRatings = await Review.findAll({
            where: { productId },
            include: Product,
        })

        const productRatingSum = productRatings.reduce( (sum, review) => {
            return review.rate + sum
        },0)
        
        const productAverageRating = productRatingSum / productRatings.length

        const product = await Product.findByPk(productId)
        product.set({
            rating: productAverageRating
        })

        await product.save();

        res.json('Review deleted successfully');
    } catch (error) {
        res.status(403).json('Error ocurred: '+ error)
    }
})

module.exports = review;