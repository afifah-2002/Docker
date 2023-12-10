const express = require('express');
const mongoose = require('mongoose');
var methodOverride = require('method-override')
var bodyParser = require('body-parser')

const app = express();
const Note = require('./models/note');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

const notesRouter = require('./routes/notes');
app.use(require("./routes/index"))
app.use(require("./routes/todo"))
require('dotenv').config();

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


app.get('/', async (req, res) => {

  res.render('index');
});

app.use(notesRouter)
app.use(require("./routes/index"))
app.use(require("./routes/todo"))



mongoose.connect(process.env.SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Has Started at 3000`);
});
