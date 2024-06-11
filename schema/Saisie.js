const { gql } = require("graphql-tag");

module.exports = gql`
  type Saisie {
    id_reservation: Int
    id_utilisateur: Int
    periode: String
    id_salle: Int
    statut: String
  }

  input SaisieFilter {
    id_reservation: Int
    id_utilisateur: Int
    periode: String
    id_salle: Int
    statut: String
  }

  type Query {
    getAllSaisie(filter: SaisieFilter): [Saisie]
  }
  type Query {
    getSaisieDay(filter: SaisieFilter): [Saisie]
  }
  type Mutation {
    addUpdateSaisie(filter: SaisieFilter): Saisie
    suppSaise(id_reservation: Int): Saisie
  }
`;
