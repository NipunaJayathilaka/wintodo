const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb");

const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("todosdb").collection("todos");
  return collection;
};

// GET /todos
router.get("/todos", async (req, res) => {
  const collection = getCollection();
  const todos = await collection.find({}).toArray();
  res.status(200).json(todos);
});

// POST /todos
router.post("/todos", async (req, res) => {
  const collection = getCollection();
  const { title, description, dueDate, status } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({ mssg: "Missing required fields" });
  }

  const newTodo = await collection.insertOne({
    title,
    description,
    dueDate,
    status: status || false,
  });

  res.status(201).json({
    _id: newTodo.insertedId,
    title,
    description,
    dueDate,
    status: status || false,
  });
});

// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);

  const deletedTodo = await collection.deleteOne({ _id });
  res.status(200).json(deletedTodo);
});

// PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const { title, description, dueDate, status } = req.body;

  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (dueDate !== undefined) updateFields.dueDate = dueDate;
  if (status !== undefined) updateFields.status = status;

  const updatedTodo = await collection.updateOne(
    { _id },
    { $set: updateFields }
  );

  res.status(200).json(updatedTodo);
});

module.exports = router;
