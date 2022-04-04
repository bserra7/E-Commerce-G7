const { User, Two_fa } = require('../db');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TwoFaVerificationCode } = require('./emailSender');

const code = () => {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  };

const googleLogin = async (req, res) => {
    const {name, email, last_name} = req.body;
    try {
        let findedUser = await User.findOne({ where: { email:{ [Op.substring]: email }}});
        if (!findedUser) {
            const hashPass = await bcrypt.hash(Math.random().toString(36).slice(2, 12), 10);
            const googleUser = await User.create({
                username: Math.random().toString(36).slice(2, 10),
                password: hashPass,
                email,
                name,
                last_name: last_name || '',
                date_of_birth: '',
                address: '',
                city: '',
                zip_code: 0,
                country: ''
            });
            googleUser.setRole(3);
            findedUser = await User.findOne({ where: { email:{ [Op.substring]: email }}});
        }
        
        const token = jwt.sign({id:findedUser.id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        })

        await Two_fa.destroy({ where: {userId: findedUser.id} })
        if(findedUser.is_two_fa){
            const new2FACode = code();
            const savedCode = await Two_fa.create({
                userId: findedUser.id,
                code: new2FACode
            })
            TwoFaVerificationCode(findedUser, new2FACode)
            if(!savedCode) throw Error ('2FA code wasnt generated')
        }
        const user = findedUser.toJSON();
        delete user.password;
        return res.json({ token, user })

    } catch (error) {
        console.error(error)
        res.status(403);
    }
}

module.exports = googleLogin