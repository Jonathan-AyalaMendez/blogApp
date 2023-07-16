const express = require("express");
const fun = require("../db/conn.js");
const { ObjectId } = require("mongodb");

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let db = fun.DB();
  let collection = await db.collection("Collection");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let db = fun.DB();
  let collection = await db.collection("Collection");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new blog post.
router.post("/", async (req, res) => {
  let db = fun.DB();
  let newDocument = {
    name: req.body.name,
    position: req.body.position,
  };
  let collection = await db.collection("Collection");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a post.
router.patch("/:id", async (req, res) => {
  let db = fun.DB();
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      position: req.body.position,
    }
  };

  let collection = await db.collection("Collection");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will delete a blog
router.delete("/:id", async (req, res) => {
  let db = fun.DB();
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("Collection");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

module.exports = router;