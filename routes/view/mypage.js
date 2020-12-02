const express = require("express");
const router = express.Router();
const db = require("../../models");

// router.get("/", function (req, res, next) {
//   res.render("mypage", { title: "HealthGallery" });
// });

router.get("/mypage", async function (req, res, next) {
  /* #region 로그인 안되어있으면 */
  if (req.user == undefined) {
    console.log("user undefined");
    return res.render("mypage.ejs", { title: "HealthGallery", page:'head_login' });
  }
  /* #endregion */

  /* #region 로그인 되어있으면 */
  let user = req.user.id;
  console.log("user: ", user);

  try {
    let info = await db.User.findOne({
      where: {
        id: user,
      },
    });
    let post = await db.Document.findAll({
      where: {
        userId: info.id,
      },
    });
    console.log("info:", info);
    res.render("mypage", {
      title: "HealthGallery",
      data: info,
      document: post,
      page: 'head_logout'
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  /* #endregion */
});

module.exports = router;
