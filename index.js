const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {
        title: "Main",
        isHome: true
    });
});

app.get('/courses', (req, res) => {
    res.render('courses', {
        title: 'Courses',
        isCourses: true
    });
});

app.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add course',
        isAdd: true
    });
});


const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
    console.log(
        `App is listening on port: ${port} \n http://localhost:${port}`
        );
});