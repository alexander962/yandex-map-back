const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

module.exports.createNewUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
    }
    const { email, password } = req.body;
    const userData = await userService.registration(email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAxge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};

module.exports.activate = async (req, res, next) => {
  try {
    const activationLink = req.params.link;
    await userService.activate(activationLink);
    return res.redirect(process.env.CLIENT_URL);
  } catch (e) {
    next(e);
  }
};

module.exports.checkUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await userService.login(email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAxge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    // достаём refreshToken
    const { refreshToken } = req.cookies;
    const token = await userService.logout(refreshToken);
    // удаляем куку с refreshToken
    res.clearCookie("refreshToken");
    // возвращаем ответ на клиент
    return res.json(token);
  } catch (e) {
    next(e);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    // достаём refreshToken
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken);
    // refresh токен будем хранить в cookie, указываем ключ, сам токен и параметры время жизни и
    // httpOnly = true(чтобы эту cookie нельзя было изменять и получать внутри браузера из js)
    res.cookie("refreshToken", userData.refreshToken, {
      maxAxge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    // возвращаем её на клиент, т.е. отправляем в браузер
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};
