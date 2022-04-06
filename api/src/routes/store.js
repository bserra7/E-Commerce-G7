const {Router} = require("express")
const { Store } = require("../db");

const stores = Router();

const adminOnly = require('../utils/adminOnly');

stores.get("/", async (req, res) => {
    try {
        const { storeId = "" } = req.query;
        const stores = await Store.findAll();
        if(!stores.length) throw Error ("The isn't stores to show!")
        if(storeId !== ""){
            const storeFinded = stores.find(store => store.id === Number(storeId));
            if(!storeFinded) throw Error ("The store doesn't exist")
            return res.status(200).json(storeFinded);
        }
        res.status(200).json(stores);

    } catch (err) {
        res.status(404).json("Error ocurred: " + err)
    }
});

stores.post("/", async (req, res) => {
    try {
        const { name, address, city, zip_code, state, country, lat, lng } = req.body;
        if(!name || !address || !city || !zip_code || !state || !country || !lat || !lng) throw Error ("Missing data on request")
        const [existent, newStore] = await Store.findOrCreate({
            where: {name: name},
            defaults: {
            name,
            address,
            city,
            zip_code,
            state,
            country,
            lat,
            lng
        }});

        if(!newStore) throw Error ("The store with that name already exists!")

        res.json("Store created successfully!");

    } catch (err) {
        console.log(err)
        res.status(404).json("Error ocurred: " + err)
    }
});

stores.put("/", adminOnly, async (req, res) => {
    try {
        const { id, name, address, city, zip_code, state, country, lat, lng } = req.body;

        const store = await Store.findByPk(id);
        if(!store) throw Error ("The Store doesn't exist");

        store.update({
            name: name ? name : store.name,
            address: address ? address : store.address,
            city: city ? city : store.city,
            zip_code: zip_code ? zip_code : store.zip_code,
            state: state ? state : store.state,
            country: country ? country : store.country,
            lat: lat ? lat : store.lat,
            lng: lng ? lng : store.lng
        });

        res.json(store);
    } catch (err) {
        res.status(404).json("Error ocurred: " + err)
    }
});

stores.delete("/", adminOnly, async (req, res) => {
    try {
        const { storeId } = req.body;

        const deletedStore = await Store.destroy({ where: { id: storeId } });
        if(!deletedStore) return res.status(404).json("This Store doesn't exists");
        res.status(200).json("Store deleted succesfully");
    } catch (err) {
        res.status(404).json("Error ocurred: " + err)
    }
});


module.exports = stores;