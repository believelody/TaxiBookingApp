require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const index = require('./routes');
const bookings = require('./routes/bookings');

const app = express();
const port = 4000;

app.use(cors());

app.listen(port, () => console.log('Server running on port ', port));

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/', index);
app.use('/api', bookings);
