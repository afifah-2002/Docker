const express = require('express');
const mongoose = require('mongoose');
var methodOverride = require('method-override')

const app = express();
const Note = require('./models/note');
const notesRouter = require('./routes/notes');
require('dotenv').config();

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const notes = await Note.find().sort('-createdAt');
  res.render('index2', { notes: notes });
});

//const dburi = "mongodb+srv://tara:tara0104@tarannummongodb.uf3qxwq.mongodb.net/?retryWrites=true&w=majority" ;
mongoose.connect(process.env.SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', notesRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Has Started`);
});

