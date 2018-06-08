const debug = require('debug')('app:startup');
const  config = require('config');
const morgan = require('morgan');
const express = require('express');
const app = express();

// using a debugger function in place of console.log
if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}


//PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ... ${port}`));
