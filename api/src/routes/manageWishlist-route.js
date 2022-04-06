const { Router } = require("express");
const { getWishlist, setWishlist, removeFromWishlist } = require("../utils/wishlist-utils");
const wishlist = Router();

wishlist.get("/", async (req, res) => {
    try {
        const { userId } = req.query;
        const wishlist = await getWishlist(userId);
        if(!wishlist) return res.status(403).json("The user wishlist doens't exist");
        res.json(wishlist);
    } catch(err) {
        res.status(404).json("Error ocurred: " + err);
    }
});

wishlist.post("/", async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const userWishlist = await setWishlist(userId, productId);
        if(!userWishlist) return res.status(403).json("The relation already exists");
        res.json(userWishlist);
    } catch(err) {
        res.status(404).json("Error ocurred: " + err);
    }
});

wishlist.delete("/", async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const deleteProduct = await removeFromWishlist(userId, productId);
        if(!deleteProduct) return res.status(403).json("The relation doesn't exist in User's Wishlist");
        res.json(deleteProduct);
    } catch(err) {
        res.status(404).json("Error ocurred: " + err);
    }
});

module.exports = wishlist;