/* #region EXPRESS */
const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`app listening at http://127.0.0.1:${port}`);
});
/* #endregion */

/* #region DATABASE */
var Posts;

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "mydb",
});

connection.connect();

connection.query("SELECT * from Posts", (error, rows, fields) => {
  if (error) throw error;
  Posts = rows;
  console.log("Posts info is: ", rows);
});

connection.end();

app.all("/mypage", function (request, response) {
  response.send(Posts);
});
/* #endregion */
