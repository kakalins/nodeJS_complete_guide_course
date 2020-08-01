var url = 'http://mylogger.io;log';

function log(message) {
    console.log(message);
}

//module.exports.log = log;
module.exports = log; //como temos apenas 1 função, pode-se exportar o modulo sem especificar as funções