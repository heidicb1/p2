const express = require('express');
const bodyParser = ('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

// ?????app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin: X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-OMethods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
});
app.use('/', require('./routes'));

// Catch all error
process.on('uncaughtExpectation', (err, origin) => {
    console.log(process.stderr.fd, `Caughty exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if(err) {
        console.log(err)
    }
    else { // Listen for traffic on that port
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
});



