const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
module.exports = async (knex, httpServer, typeDefs, resolvers) => {
  try {
    const apolloServer = new ApolloServer({
      schema: makeExecutableSchema({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      }),
    });
    await apolloServer.start();

    return apolloServer;
  } catch (err) {
    console.error(`Error during the setup of Apollo Server : ${err}`);
  }
};
