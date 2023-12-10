const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.get('/new2', (req, res) => {
  res.render('new2');
});

router.get('/index2', async (req, res) => {
  const notes = await Note.find().sort('-createdAt');
  res.render('index2', { notes: notes });
});


router.post('/', async (req, res) => {
  let note = await new Note({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    note = await note.save();
    res.redirect('/index2');
  } catch (e) {
    console.log(e);
    res.render('new2');
  }
});

module.exports = router;