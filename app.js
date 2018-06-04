
const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();

// Register a Listener 
logger.on('messagedLogged', (arg) => {
    console.log('Listening called', arg);
});

logger.log('message');