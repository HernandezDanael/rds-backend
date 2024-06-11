const { gql } = require("graphql-tag");

module.exports = gql`
  type Salle {
    id_salle: Int
    description: String
    statut: String
  }

  input SalleFilter {
    id_salle: Int
    description: String
    statut: String
  }

  type Query {
    getAllSalle: [Salle]
  }

  type Mutation {
    addUpdateSalle(filter: SalleFilter): Salle
    delSalle(id_salle: Int): Salle
  }
`;
