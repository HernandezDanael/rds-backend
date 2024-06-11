module.exports = (knex) => ({
  /**
   */
  AddLog: async (type, user, parameters, message) => {
    return await knex.from('LogsIHM').insert({
      type,
      user,
      parameters,
      message,
    });
  },
});
