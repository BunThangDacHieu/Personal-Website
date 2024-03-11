require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const morgan = require('morgan');
const User = require('./server/models/User.js')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

//ConnectDB
connectDB();
function isOkay() {
    console.log('connect to mongodb is OKay');// check mongodb có kết nối thành công hay không
}
//Middleware for parsing request body
app.use(morgan('combined'));

app.use(express.json());

//middleware for CORS POlicy
//Option 1: Allow all origin with defaults of cors
// app.use(cors());
//Option 2: allow Customer Origin 
app.use(
    cors({
        origin: 'http://localhost:8080/',
        methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
        allowedHeaders: []
    })
)

//Static files
// app.use(express.static('public'));

//Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


//Routes
app.use('/', require('./server/routes/UserRoutes'))


// Định nghĩa một endpoint POST mới tại '/users' trong ứng dụng Express.

// Handle 404
// app.get('*', (req, res) => {
//     res.status(404).render('404');
// });
app.listen(port, () => console.log(`Listen on the ${port}`))
