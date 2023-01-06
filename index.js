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
    res.render('index');
});


const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
    console.log(
        `App is listening on port: ${port} \n http://localhost:${port}`
        );
});