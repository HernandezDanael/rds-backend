const { DateTimeTypeDefinition } = require("graphql-scalars");
const { TimestampTypeDefinition } = require("graphql-scalars");
const { DateTypeDefinition } = require("graphql-scalars");

const Utilisateur = require("./Utilisateurs");
const Salle = require("./Salle");
const Saisie = require("./Saisie");

module.exports = [
  DateTimeTypeDefinition,
  TimestampTypeDefinition,
  DateTypeDefinition,
  //IHM
  Utilisateur,
  Salle,
  Saisie,
];
