const { gql } = require("graphql-tag");

module.exports = gql`
  type Utilisateurs {
    id_utilisateur: Int
    mdp: String
    identifiant: String
    adresse: String
    siret: String
    email: String
    num_tel: Int
    nom: String
    prenom: String
    droit: String
    ligue: Int
    nb_reservation_gratuite: Int
    amphi: Int
    statut: String
  }

  type UtilisateursAdmin {
    id_utilisateur: Int
    mdp: String
    adresse: String
    siret: String
    email: String
    num_tel: Int
    nom: String
    prenom: String
    droit: String
    ligue: Int
    nb_reservation_gratuite: Int
    amphi: Int
    statut: String
    identifiant: String
  }

  input UtilisateursFilter {
    id_utilisateur: Int
    mdp: String
    adresse: String
    siret: String
    email: String
    num_tel: Int
    nom: String
    prenom: String
    droit: String
    ligue: Int
    nb_reservation_gratuite: Int
    amphi: Int
    statut: String
    identifiant: String
  }

  type Query {
    utilisateur(filter: UtilisateursFilter): Utilisateurs
    getAllUsers: [UtilisateursAdmin]
  }

  type Mutation {
    addUpdateUtilisateur(filter: UtilisateursFilter): Utilisateurs
    delUtilisateur(id_utilisateur: Int): Utilisateurs
  }
`;
