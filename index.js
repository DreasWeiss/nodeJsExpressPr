require('dotenv').config();
const express = require('express');

const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const path = require('path');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cartRoutes = require('./routes/cart');

const app = express();

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
//Routes
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/cart', cartRoutes);

async function start() {
    try {
        const mongoDbUri = `mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPSW}@cluster0.7t8l1ua.mongodb.net/shop`;
        await mongoose.connect(mongoDbUri);

        const port = process.env.PORT || 3000;
        const listener = app.listen(port, () => {
            console.log(
                `App is listening on port: ${port} \n http://localhost:${port}`
            );
        });


    } catch (err) {
        console.log(err);
    }
}

start();
