const express = require("express");
const router = express.Router();

const DocumentAPI = require("./document");
const AuthAPI = require("./auth");
const MyinfoAPI = require("./myinfo");

router.use("/doc", DocumentAPI);
router.use("/auth", AuthAPI);
router.use("/myinfo", MyinfoAPI);

module.exports = router;
