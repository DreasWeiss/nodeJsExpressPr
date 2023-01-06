const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'views','index.html'));
});


const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
    console.log(
        `App is listening on port: ${port} \n http://localhost:${port}`
        );
});