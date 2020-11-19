const express = require("express");
const app = express();
const port = 3000;

/* #region EJS */
app.set("view engine", "ejs");
app.set("views", __dirname + "/public/views");
/* #endregion */

/* #region main page */
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/mypage", (req, res) => {
  res.render("mypage");
});

app.get("/cardio", (req, res) => {
  res.render("cardio");
});
/* #endregion */

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

/* #region CSS, JS*/
app.use(express.static(__dirname + "/public"));
/* #endregion */
