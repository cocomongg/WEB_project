const { Router } = require("express");
const express = require("express");
const app = express();
const port = 3000;

/* #region for Static HTML */
app.use(express.static("public"));
/* #endregion */

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
