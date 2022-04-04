const { Router } = require("express");
const { User, Two_fa } = require('../db');
const { TwoFaVerificationCode } = require("../utils/emailSender");

const TwoFA = Router();

TwoFA.put("/", async (req, res) => {
  try {
    const { action, userId, two_fa } = req.body;
    if(!userId) throw Error('User ID must be provided');
    const findedUser = await User.findByPk(userId);
    if(!findedUser) throw Error('User not found');
    if(action === 'set'){
      await findedUser.update({
        is_two_fa: two_fa,
        two_fa_verified: two_fa
      });
    }else if (action === 'logout'){
      await findedUser.update({
        two_fa_verified: two_fa
      });
    }
    res.json('User 2FA updated');
  } catch (error) {
    res.status(404).json('Error ocurred: '+ error);
  }
});

TwoFA.post("/verify", async (req, res) => {
  try {
    const { userId, code } = req.body;
    if(!userId && !code) throw Error('User ID and Code must be provided');
    const findedUser = await User.findByPk(userId);
    if(!findedUser) throw Error('User not found');
    const findedCode = await Two_fa.findByPk(userId)
    if(findedCode.code === code){
      findedCode.destroy({ where: {userId} })
      return res.json('2FA correct');
    } else throw Error("2FA Code doens't match");
  } catch (error) {
    res.status(404).json('Error ocurred: '+ error);
  }
});

TwoFA.post("/set", async (req, res) => {
  try {
    const { userId } = req.body;
    if(!userId) throw Error('User ID and Code must be provided');
    const findedUser = await User.findByPk(userId);
    if(!findedUser) throw Error('User not found');
    await findedUser.update({
      two_fa_verified: true
    });
    res.json('User 2FA verified successfully!');
  } catch (error) {
    res.status(404).json('Error ocurred: '+ error);
  }
});

TwoFA.post("/resend", async (req, res) => {
  try {
    const { userId } = req.body;
    if(!userId) throw Error('User ID must be provided');
    const findedUser = await User.findByPk(userId);
    if(!findedUser) throw Error('User not found');
    const findedCode = await Two_fa.findByPk(userId);
    if(!findedCode) throw Error('Code not found');
    TwoFaVerificationCode(findedUser, findedCode.dataValues.code )
    res.json('2FA Code send successfully!');
  } catch (error) {
    res.status(404).json('Error ocurred: '+ error);
  }
});

module.exports = TwoFA;