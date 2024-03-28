require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const morgan = require('morgan');
const User = require('./server/models/User.js');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 8080;


const multer = require('multer');
// Định nghĩa disk storage cho Multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// Khởi tạo upload
var upload = multer({ storage: storage });
//ConnectDB
connectDB({
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//Middleware for parsing request body
app.use(morgan('combined'));

app.use(express.json());

//middleware for CORS POlicy
//Option 1: Allow all origin with defaults of cors
// app.use(cors());
//Option 2: allow Customer Origin 
app.use(
    cors({
        origin: 'http://localhost:4200'
    })
)

//Static files
// app.use(express.static('public'));

//Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.use(bodyParser.json());


//Routes
app.use('/', require('./server/routes/UserRoutes'))

// Handle 404
// app.get('*', (req, res) => {
//     res.status(404).render('404');
// });
app.listen(port, () => console.log(`Listen on the ${port}`))
