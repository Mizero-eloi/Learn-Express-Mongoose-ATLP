const express = require("express");
const Post = require("../Models/post"); // new
const router = express.Router();

// Get all posts
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

module.exports = router;

// Creating a post api

router.post("/posts", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  await post.save();
  res.send(post);
});

// Getting a single post

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

// Updating the post

router.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

// Deleting the post

router.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndRemove(req.params.id);
    res.status(200).send(deletedPost);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});
