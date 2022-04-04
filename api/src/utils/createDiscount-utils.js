const { Product, Category, Discount_category, product_category } = require('../db');
const { Op } = require('sequelize');

const postDiscount = async (discount, categoryId, weekday) => {
    discount = parseInt(discount)
    if (!discount || !categoryId) throw Error('A valid category and a discount are required')

    const checkDiscount = await Discount_category.findByPk(categoryId)

    if (checkDiscount) throw Error('Category already has a discount')

    // agregamos el descuento a la tabla de descuentos
    const newDiscount = await Discount_category.findOrCreate({
        where: {
            categoryId,
            discount,
            weekday
        }
    })

    // encotramos todos los productos de la categoria con descuento
    const productsToDiscount = await product_category.findAll({
        where: {
            categoryId
        }
    })

    const discountedProducts = await Promise.all(
        productsToDiscount.map((p) => {
            Product.findByPk(p.productId)
            .then(
                prod => prod.update({
                    // discount es un campo virutal pero el setter de la base de datos se encarga de setear el valor apropiado, recibe un string de dos palabras
                    // seteamos el campo descuento al descuento apropiado
                    discount : `discount_${weekday} ${discount}`
                })
            )
        })
    )
    
    return discountedProducts;

};

const deleteDiscount = async categoryId => {
    // lo necesitamos para saber para que día de la semana estaba programado el descuento
    let discountToDelete = await Discount_category.findOne(
        {where: { categoryId }}
    )
    try{
        // borramos el descuento de la tabla de descuentos
        let deletedDiscount= await Discount_category.destroy({where: { categoryId }})

        if (!deletedDiscount) throw Error('Discount does not exist in the DB')

        // encontramos las Pk de los productos de la categoría que tenía descuento
        const productsToRestore = await product_category.findAll({
            where: {
                categoryId
            },
        })
        
        const restoredProducts = await Promise.all(
            productsToRestore.map((p) => {
                Product.findByPk(p.productId)
                .then(
                    prod => prod.update({
                    // discount es un campo virutal pero el setter de la base de datos se encarga de setear el valor apropiado, recibe un string de dos palabras
                    // aqui estamos regresando el valor del descuento de producto a 0
                        discount : `discount_${discountToDelete.weekday} 0`
                    })
                )
            })
        )

        return restoredProducts;

    } catch(err) {
        throw Error("Couldn't delete discount... " + err)
    } 
}

const getDiscounts = async () => {
    try {
        let allDiscounts = await Discount_category.findAll({include: Category});
        return allDiscounts
    } catch(err) {
        console.error('No discounts on the DB', err)
    } 
}

module.exports = { postDiscount, deleteDiscount, getDiscounts }
