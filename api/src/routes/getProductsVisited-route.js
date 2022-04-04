const { Router } = require("express");
const { getVisited, postVisited } = require("../utils/visitedProducts-utils");
const visitedProducts = Router();

visitedProducts.get("/", async (req, res) => {
    try {
        const { userId } = req.query;
        const productVisited = await getVisited(userId);
        res.json(productVisited);
    } catch(err) {
        res.status(404).send(err);
    }
});

visitedProducts.post("/", async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const productVisited = await postVisited(userId, productId);
        if(!productVisited) return res.status(403).json("The relation already exists");
        res.json(productVisited);
    } catch(err) {
        res.status(404).send(err);
    }
});

module.exports = visitedProducts;