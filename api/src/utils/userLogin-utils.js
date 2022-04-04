const { User, Two_fa } = require('../db');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TwoFaVerificationCode } = require('./emailSender');

const code = () => {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  };

module.exports = {
    userLogin : async (username, password) => {
        const findedUser = await User.findOne({ where: { username:{ [Op.substring]: username }}});
        if (!findedUser) throw Error('User not found');

        const validPassword = await bcrypt.compare(password, findedUser.password);
        if (!validPassword) throw Error('Invalid Password');
        else {
            const token = jwt.sign({id:findedUser.id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            })
            await Two_fa.destroy({ where: {userId: findedUser.id} })
            if(findedUser.is_two_fa){
                findedUser.two_fa_verified = false;
                findedUser.save();
                const new2FACode = code();
                const savedCode = await Two_fa.create({
                    userId: findedUser.id,
                    code: new2FACode
                })
                TwoFaVerificationCode(findedUser, new2FACode)
                if(!savedCode) throw Error ('2FA code wasnt generated')
            }
            const cookiesOptions = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            const cookie = {name: 'jwt', token, options: cookiesOptions};
            const user = findedUser.toJSON();
            delete user.password;
            return { cookie, user }
        }
    }
}