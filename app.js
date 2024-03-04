require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8080;

//ConnectDB
connectDB();
function isOkay() {
    console.log('connect to mongodb is OKay');// check mongodb có kết nối thành công hay không
}
app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static files
app.use(express.static('public'));

//Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


//Routes
app.use('/', require('./server/routes/routes'))

// app.get('/', (req, res) => {
//     const locals = {
//         title: 'Nodejs',
//         description: 'ndandna'
//     }
//     res.render('index', locals)
// })

// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});
app.listen(port, () => console.log(`Listen on the ${port}`))
