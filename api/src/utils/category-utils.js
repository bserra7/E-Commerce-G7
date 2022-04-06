const { Category } = require('../db.js')

const getCategories = async(req, res) => {
    try {
        const db = await Category.findAll()
        if(!db) throw Error('Database empty')
        res.send(db)
    } catch (err) {
        res.status(404).send(`${err}`)
    } 
}

module.exports = {
    getCategories
}