const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async index(req, res) {
    try {
      const { user } = req.headers;

      const loggedUser = await Dev.findById(user);

      const users = await Dev.find({
        $and: [
          { _id: { $ne: user } },
          { _id: { $nin: loggedUser.likes } },
          { _id: { $nin: loggedUser.dislikes } }
        ]
      });

      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "ops!" });
    }
  },
  async store(req, res) {
    try {
      const { username } = req.body;

      // TODO: Verificar de se o usuário existe com case insensitive
      const userExists = await Dev.findOne({ user: username });

      if (userExists) {
        return res.json(userExists);
      }

      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );

      const { name, bio, avatar_url: avatar } = response.data;

      // TODO: Substituir o nome salvo na base pelo dado oriundo do github
      const dev = await Dev.create({
        name,
        user: username,
        bio,
        avatar
      });

      return res.json(dev);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "ops!" });
    }
  }
};
