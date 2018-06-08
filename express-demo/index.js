const startupDebug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db'); // returns a debugging function 
const  config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();
//using pug
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // this enables the name object 
app.use(express.urlencoded({ extended: true }));// middleware
app.use(express.static('public'))// middleware 
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
// Configuration 
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

//shows what the code is running on 
if(app.get('env') === 'production'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...')
}

app.use(function(req, res, next) {
    console.log('Logging ...');
    next();// this passes the control to another middleware function 
}); // called to install middleware function 

app.use(logger);

//PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ... ${port}`));
