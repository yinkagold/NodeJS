const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const home = require('./routes/home');

const app = express();


mongoose.connect('mongodb://localhost/myDB')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));


//using pug
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ...${port}`));


