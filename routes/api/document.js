const express = require("express");
const router = express.Router();

const db = require("../../models");

router.get("/", async function (req, res) {
  try {
    let documents = await db.Document.findAll({
      order: [["id", "DESC"]],
    });

    res.json(documents);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/", async function (req, res) {
  let title = req.body.title;
  let content = req.body.content;

  if (!req.user) return res.status(404).send("로그인을 해 주십시오");

  let userId = req.user.id;

  try {
    await db.Document.create({
      title,
      content,
      userId,
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/id/:docId", async function (req, res) {
  let docId = req.params.docId;

  if (!docId) return res.send(400).send(err);

  try {
    let document = await db.Document.findOne({
      where: {
        id: docId,
      },
    });

    res.json(document);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
