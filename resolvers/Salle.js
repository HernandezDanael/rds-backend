/* eslint-disable camelcase */
module.exports = (knex, Errors, Logger) => ({
  Query: {
    getAllSalle: async (_, args, contextValue) => {
      try {
        return await knex.from("salle");
      } catch (error) {
        Errors.throwError(Logger, {
          type: "CATCH",
          user: contextValue.req.user.trigramme,
          parameters: JSON.stringify(args),
          message: `Resolvers.getAllSalle : ${error}`,
        });
      }
    },
  },

  Mutation: {
    addUpdateSalle: async (_, args, contextValue) => {
      try {
        const filter = args.filter;
        console.log(filter);
        let addUpdateSalle;
        if (filter.id_salle) {
          await knex("salle")
            .where("id_salle", "=", filter.id_salle)
            .update(filter);
          addUpdateSalle = await knex
            .from("salle")
            .where("id_salle", "=", filter.id_salle)
            .first();
        } else {
          const [newId] = await knex("salle").insert(filter);
          addUpdateSalle = await knex
            .from("salle")
            .where("id_salle", "=", newId)
            .first();
        }
        return addUpdateSalle;
      } catch (error) {
        Errors.throwError(Logger, {
          type: "CATCH",
          user: contextValue.req.user.trigramme,
          parameters: JSON.stringify(args),
          message: `Resolvers.addUpdateSalle : ${error}`,
        });
      }
    },
    delSalle: async (_, args, contextValue) => {
      try {
        if (args.id_salle) {
          await knex("salle").where("id_salle", "=", args.id_salle).del();
        }
        return;
      } catch (error) {
        Errors.throwError(Logger, {
          type: "CATCH",
          user: contextValue.req.user.trigramme,
          parameters: JSON.stringify(args),
          message: `Resolvers.delSalle : ${error}`,
        });
      }
    },
  },
});
