module.exports = {
  setup: () => {
    require("dotenv").config();
    const knex = require("knex")({
      client: "mysql2",
      connection: () => {
        const connection = {
          host: "127.0.0.1",
          port: 3306,
          user: "root",
          password: "",
          database: "rds",
          typeCast: function (field, next) {
            if (field.type == "DATETIME" || field.type == "DATE") {
              let str = field.string();
              let dte = new Date(str);
              if (str == null) {
                return null;
              } else {
                if (isNaN(dte)) {
                  return null;
                }
                return dte;
              }
            }
            // Force TLS connection if specified
            if (process.env.DB_SSL) {
              connection.ssl = { rejectUnauthorized: false };
            }

            return next();
          },
        };
        return connection;
      },
      timezone: "UTC",
      debug: "debug",
    });
    return knex;
  },

  init: async (knex) => {
    let tableName = "utilisateur";
    let exists = await knex.schema.hasTable(tableName);
    let arrayToInsert = [];
    // const test = await knex.select('id_utilisateur', 'employe').from('Utilisateurs');
    if (!exists) {
      await knex.schema.createTable(tableName, (table) => {
        table.increments("id_utilisateur");
        table.string("mdp");
        table.string("adresse");
        table.string("siret");
        table.string("email");
        table.integer("num_tel");
        table.string("nom");
        table.string("prenom");
        table.string("droit");
        table.integer("ligue");
        table.integer("nb_reservation_gratuite");
        table.integer("amphi");
        table.string("statut");
        table.string("identifiant");
      });
    }
    // tableName = "Actions";
    // exists = await knex.schema.hasTable(tableName);
    // // const test = await knex.select('id_utilisateur', 'employe').from('Utilisateurs');
    // if (!exists) {
    //   await knex.schema.createTable(tableName, (table) => {
    //     table.increments("id_action");
    //     table.integer("id_droit");
    //     table.string("nom");
    //   });
    // }
    console.log("Initialized database");
  },
};
