const Errors = require('./Errors');
const LoggerService = require('./Logger');

module.exports = (knex) => {
  const loggerService = LoggerService(knex, Errors);
  return {
    Errors,
    Logger: loggerService,
  };
};
