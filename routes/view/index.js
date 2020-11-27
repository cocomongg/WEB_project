const express = require("express");
const router = express.Router();

const mainView = require("./main");
const mypageView = require("./mypage");
const postView = require("./post");
// TODO: 다른 페이지 추가
router.use("/", mainView);
router.use("/mypage", mypageView);
router.use("/post", postView);

module.exports = router;
