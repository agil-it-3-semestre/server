const Utils = require('../../Util');
const User = require('../../app/models').user;

const router = require("express").Router();

router.get("/", async (req, res) => {
    let response = await Utils.SafeQuery(User.findAll())

    if (response instanceof Error) {
        res.status(500).json({ error: error.toString() });
    }
    res.json(users);
});

router.post("/", async (req, res) => {
  let user = await User.create(req.body);
  res.json(user);
});

router.get("/:id", async (req, res) => {
  let user = await User.findOne({ where: { id: req.params.id } });
  res.json(user);
});

router.put("/:id", async (req, res) => {
  let user = await User.update(req.body, { where: { id: req.params.id } });
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  let user = await User.destroy({ where: { id: req.params.id } });
  res.json(user);
});