const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const { ApolloServer } = require("apollo-server-express"); // Importez ApolloServer depuis apollo-server-express
const databaseHandler = require("./db");
const IMHApollo = require("./apollo");
const IMHTypeDefs = require("./schema");
const IMHResolvers = require("./resolvers");
const IMHServices = require("./services");

async function main() {
  // DB INIT
  const knex = databaseHandler.setup();
  await databaseHandler.init(knex);

  // ENDPOINT INIT
  const app = express();
  const httpServer = http.createServer(app);

  const services = IMHServices(knex);
  const apolloServer = new ApolloServer({
    typeDefs: IMHTypeDefs,
    resolvers: IMHResolvers(knex, services),
  });

  // Intégration avec Express
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/api" }); // Utilisez applyMiddleware pour intégrer avec Express

  app.use("/api", cors(), bodyParser.json({ limit: "100mb" }));

  process.on("SIGINT", async () => {
    try {
      console.info("Shutting down...");
      await apolloServer.stop();
      httpServer.close();
    } catch (err) {
      console.error(`Error during shutdown : ${err}`);
    }
    process.exit(0);
  });

  // Lancer l'écoute sur le port spécifié
  const port = 4000;
  await new Promise((resolve) => httpServer.listen(port, resolve));
  console.log(`Server running on port ${port}`);
}

main();
