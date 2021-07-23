const User = require("../../db/models/users");
const sha1 = require("js-sha1");

module.exports.createNewUser = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const checkUser = await User.findOne({ login });
    if (checkUser) {
      return res.status(400).send({ error: "Пользователь уже существует" });
    }
    const passwordHash = await sha1(password);
    const user = new User({login, password: passwordHash});
    user.save().then((result) => {
      res.send({ data: result })
    })
  } catch (e) {
    res.send({ message: "Server error" });
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