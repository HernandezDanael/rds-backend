/* eslint-disable camelcase */
module.exports = (knex, Errors, Logger) => ({
  Query: {
    getAllSaisie: async (_, args, contextValue) => {
      try {
        const filter = args.filter;
        if (filter.id_utilisateur !== undefined) {
          return await knex
            .from("reservation")
            .where("id_utilisateur", "=", filter.id_utilisateur);
        } else {
          return await knex.from("reservation");
        }
      } catch (error) {
        Errors.throwError(Logger, {
          type: "CATCH",
          user: contextValue.req.user.trigramme,
          parameters: JSON.stringify(args),
          message: `Resolvers.getAllSalle : ${error}`,
        });
      }
    },
    getSaisieDay: async (_, args, contextValue) => {
      try {
        const filter = args.filter;
        console.log(filter);
        return await knex
          .from("reservation")
          .where("periode", "like", filter.periode);
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
    addUpdateSaisie: async (_, args, contextValue) => {
      try {
        const filter = args.filter;
        let addUpdateSalle;
        if (filter.id_reservation) {
          await knex("reservation")
            .where("id_reservation", "=", filter.id_reservation)
            .update(filter);
          addUpdateSalle = await knex
            .from("reservation")
            .where("id_reservation", "=", filter.id_reservation)
            .first();
        } else {
          const [newId] = await knex("reservation").insert(filter);
          addUpdateSalle = await knex
            .from("reservation")
            .where("id_reservation", "=", newId)
            .first();
        }
        return addUpdateSalle;
      } catch (error) {
        Errors.throwError(Logger, {
          type: "CATCH",
          user: contextValue.req.user.trigramme,
          parameters: JSON.stringify(args),
          message: `Resolvers.addUpdateSaisie : ${error}`,
        });
      }
    },
    suppSaise: async (_, args, contextValue) => {
      try {
        if (args.id_reservation) {
          await knex("reservation")
            .where("id_reservation", "=", args.id_reservation)
            .del();
        }
        return;
      } catch (error) {
        Errors.throwError(Logger, {
          type: "CATCH",
          user: contextValue.req.user.trigramme,
          parameters: JSON.stringify(args),
          message: `Resolvers.delUtilisateur : ${error}`,
        });
      }
    },
  },
});
