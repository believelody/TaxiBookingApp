require('dotenv').config();
const app = require('express')();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const index = require('./routes');
const bookings = require('./routes/bookings');
const driverLocation = require('./routes/driverLocation');

const port = 4000;

app.use(cors());

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/', index);
app.use('/api/bookings', bookings);
app.use('/api/driverLocation', driverLocation);

io.on('connection', (socket) => {
  console.log(`listening on port ${port}`);
});
http.listen(port, () => console.log('Server running on port ', port));
