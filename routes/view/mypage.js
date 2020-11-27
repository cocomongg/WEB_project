const express = require("express");
const router = express.Router();
const db = require("../../models");


router.get("/", function (req, res, next) {
  res.render("mypage", { title: "HealthGallery" });
});

router.get("/myinfo", async function (req, res, next) {
  if (req.user == undefined) {
    console.log("user undefined");
    return res.sendStatus(400);
  }

  let user = req.user.id;
  console.log("user: ", user);

  try {
    let info = await db.User.findOne({
      where: {
        id: user,
      },
    });
    console.log("info:", info);
    res.render("mypage.ejs", data=info);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
