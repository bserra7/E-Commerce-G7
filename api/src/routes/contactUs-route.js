const {Router} = require("express")
const {ContactUs} = require("../utils/emailSender")

const contactUs = Router()

contactUs.post("/", async (req, res) => {
    const data = req.body
    try {
        const nose = await ContactUs(data)
        res.send("Message sent")
    } catch (err) {
        res.status(404).send(`${err}`)
    }
})

module.exports = contactUs