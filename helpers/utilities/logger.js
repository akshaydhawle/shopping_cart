require('winston-daily-rotate-file');

var winston = require('winston');
 
var transport = new (winston.transports.DailyRotateFile)({
    filename: 'logs/app-%DATE%.log',
    prepend: true,
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '1m',
    maxFiles: '14d'
  });
 
  var logger = winston.createLogger({
    transports: [
      transport
    ]
  });

  module.exports = {
      logger
  }
