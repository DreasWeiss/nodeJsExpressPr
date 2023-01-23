require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// handlebars
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
// routes
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');
// models
const User = require('./models/user');

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

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('63cd09f95f2de1a63ae98e88');
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
//Routes
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);

async function start() {
    try {
        const mongoDbUri = `mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPSW}@cluster0.7t8l1ua.mongodb.net/shop`;
        mongoose.set('strictQuery', true);
        await mongoose.connect(mongoDbUri);
        console.log('Successfuly connected to the data base :)))');

        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: 'dreasweiss@gmail.com',
                name: 'Dreas',
                cart: { items: [] }
            });
            await user.save();
        }

        const port = process.env.PORT || 3000;
        const listener = app.listen(port, () => {
            console.log(
                `App is listening on port: ${port} \n http://localhost:${port} \n Let's rock!`
            );
        });


    } catch (err) {
        console.log(err);
    }
}

start();
