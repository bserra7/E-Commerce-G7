const { Product, Category } = require('../db.js');

module.exports = {
    getProducts : async (name, category) => {
    let products = await Product.findAll({include: Category});
    products = await products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images,
        stock: product.stock,
        categories: product.categories?.map(category => category.name),
        rating: product.rating,
        price: product.price,
        discount: product.discount,
        discounted_price: product.discounted_price
    }));
    
    let toFilter = [...products];

    // Aplico los filtros en caso que existan
    if(name !== '') toFilter = toFilter.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    if(category !== '') toFilter = toFilter.filter(product => product.categories?.includes(category));

    // Ordeno el arreglo de manera ascendente, en caso de contener ambas fuentes, mixeo los datos y los deja ordenados
    toFilter.sort((a, b) => {
        const A = a.name.toLowerCase();
        const B = b.name.toLowerCase()
        if (A < B) return -1;
        if (A > B) return 1;
        return 0;
    })
    
    return toFilter.length ? toFilter : "No results found";
    }
}
