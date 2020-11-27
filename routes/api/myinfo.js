const express = require("express");
const router = express.Router();

const db = require("../../models");

router.get("/", async function (req, res, next) {
  if (req.user == undefined) {
    console.log("user undefined");
    return res.sendStatus(400);
  }

  let user = req.user.id;
  console.log("user: ", user)

  try {
    let info = await db.User.findOne({
      where: {
        id: user,
      },
    });
    console.log("info:", info);
    res.json(info);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
