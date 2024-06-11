/* eslint-disable camelcase */
module.exports = (knex, Errors, Logger) => ({
  Query: {
    utilisateur: async (_, args, contextValue) => {
      try {
        const filter = args.filter;
        return await knex
          .from("utilisateur")
          .where("identifiant", "=", filter.identifiant)
          .andWhere("mdp", "=", filter.mdp)
          .first();
      } catch (error) {
        Errors.throwError(Logger, {
          type: "CATCH",
          user: contextValue.req.user.trigramme,
          parameters: JSON.stringify(args),
          message: `Resolvers.utilisateur : ${error}`,
        });
      }
    },
    getAllUsers: async (_, args, contextValue) => {
      try {
        return await knex.from("utilisateur");
      } catch (error) {
        Errors.throwError(Logger, {
          type: "CATCH",
          user: contextValue.req.user.trigramme,
          parameters: JSON.stringify(args),
          message: `Resolvers.getAllUsers : ${error}`,
        });
      }
    },
  },

  Mutation: {
    addUpdateUtilisateur: async (_, args, contextValue) => {
      try {
        const filter = args.filter;
        let updatedUtilisateur;
        if (filter.id_utilisateur) {
          await knex("utilisateur")
            .where("id_utilisateur", "=", filter.id_utilisateur)
            .update(filter);
          updatedUtilisateur = await knex
            .from("utilisateur")
            .where("id_utilisateur", "=", filter.id_utilisateur)
            .first();
        } else {
          const [newId] = await knex("utilisateur").insert(filter);
          updatedUtilisateur = await knex
            .from("utilisateur")
            .where("id_utilisateur", "=", newId)
            .first();
        }
        return updatedUtilisateur;
      } catch (error) {
        Errors.throwError(Logger, {
          type: "CATCH",
          user: contextValue.req.user.trigramme,
          parameters: JSON.stringify(args),
          message: `Resolvers.addUpdateUtilisateur : ${error}`,
        });
      }
    },

    delUtilisateur: async (_, args, contextValue) => {
      try {
        console.log(args);
        if (args.id_utilisateur) {
          await knex("utilisateur")
            .where("id_utilisateur", "=", args.id_utilisateur)
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
