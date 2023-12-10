const router = require("express").Router()
const Todo = require("../models/Todo");

// routes will be here....
router.get("/index3", async(req, res) => {
    const allTodo = await Todo.find();
    res.render("index3", {todo: allTodo})
})

router.get("/pending", async(req, res) => {
    const allTodo = await Todo.find({done: { $eq: false}});
    res.render("pending", {todo: allTodo})
})

router.get("/completed", async(req, res) => {
    const allTodo = await Todo.find({done: { $eq: true}});
    res.render("completed", {todo: allTodo})
})


module.exports = router;