const router = require("express").Router();
const { render } = require("ejs");
const Todo = require("../models/Todo");

// routes
router
  .post("/add/todo", (req, res) => {
    const { todo } = req.body;
    
    const newTodo = new Todo({ todo, done: false });
    if( todo==""){
      res.redirect("/index3")
    }


    // save the todo
    newTodo
      .save()
      .then(() => {
        console.log("Successfully added todo!");
        res.redirect("/index3");
      })
      .catch((err) => console.log(err));
  })

  

  .get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    Todo.deleteOne({ _id })
      .then(() => {
        console.log("Deleted Todo Successfully!");
        res.redirect("/index3");
      })
      .catch((err) => console.log(err));
  })

  .get("/update/todo/:_id",(req,res)=>{
    const {_id}=req.params;
    const info=Todo.find();
    // console.log(info)
    Todo.updateOne({_id}, { done: true})
    .then(()=>{
        console.log("Updated Todo succesfully!")
        res.redirect('/index3')
    })
    .catch((err)=>console.log(err));
});

module.exports = router;
