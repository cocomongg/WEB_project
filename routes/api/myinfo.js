const express = require("express");
const router = express.Router();

const db = require("../../models");

// TODO: 되는지 확인,, 로그인이 안되어있어서 아직 안되는 듯..?
router.get("/myinfo", async function (req, res) {
  let user = req.user.id;
  if (!user) {
    res.sendStatus(400);
    return;
  }

  try {
    let info = db.Document.findOne({
      where: {
        username: user,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
