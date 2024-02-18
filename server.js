const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');

require('dotenv').config();

const connectDB = require('./database/db');
const isActiveRoute = require('./helpers/routeHelpers');

const app = express();
const PORT = process.env.PORT || 5000;
  
// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.locals.isActiveRoute = isActiveRoute; 


app.use('/', require('./routes/Post'));

app.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}`);
});
