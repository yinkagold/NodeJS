const EventEmitter = require('events');


var url = 'http://mylogger.io/log';

class Logger extends EventEmitter { // extends allow the class to have all the capabilities of the class EVentEmitter 
     log(message) {
        // Send an HTTP request
        console.log(message);
    
        // Raise an event 
        this.emit('messagedLogged', { id: 1 , url: 'http://' });
    }
}

module.exports = Logger; 