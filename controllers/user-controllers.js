const userService = require('../service/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')

module.exports.createNewUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
    }
    const {email, password} = req.body
    const userData = await userService.registration(email, password)
    res.cookie('refreshToken', userData.refreshToken, {maxAxge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.json(userData)
  } catch (e) {
    next(e)
  }
}

module.exports.activate = async (req, res, next) => {
  try {
    const activationLink = req.params.link
    await userService.activate(activationLink)
    return res.redirect(process.env.CLIENT_URL)
  } catch (e) {
    next(e)
  }
}

module.exports.checkUser = (req, res, next) => {
  User.findOne({ login: req.body.login }).then((result) => {
    if (result) {
      const userPasswordHash = sha1(req.body.password);
      if (userPasswordHash === result.password) {
        return res.status(200).send({ data: result });
      } else {
        return res.status(404).send({ error: "Пароль не верный" });
      }
    } else {
      return res.status(404).send({ error: "Пользователь не найден" });
    }
  })
}