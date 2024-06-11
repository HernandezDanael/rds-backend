const {
  DateTimeResolver,
  TimestampResolver,
  DateResolver,
} = require("graphql-scalars");

const Utilisateur = require("./Utilisateurs");
const Salle = require("./Salle");
const Reservation = require("./Saisie");

module.exports = (knex, services) => [
  { DateTime: DateTimeResolver },
  { Timestamp: TimestampResolver },
  { Date: DateResolver },

  Utilisateur(knex, services.Errors, services.Logger),
  Salle(knex, services.Errors, services.Logger),
  Reservation(knex, services.Errors, services.Logger),
];
