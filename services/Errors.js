const { GraphQLError } = require('graphql');

exports.throwError = (Logger, args) => {
  // args.message
  // args.type
  // args.id_offre
  // args.trigramme

  if (process.env.NODE_ENV === 'dev') {
    console.log(
      `${new Date().toLocaleTimeString()} TYPE : ${args.type} - USER : ${args.user} - PARAMS : ${args.parameters} - MESSAGE : ${
        args.message
      }`
    );
  }
  Logger.AddLog(args.type, args.user, args.parameters, args.message);

  throw new GraphQLError(args.message + '___' + args.type, {
    extensions: {
      code: args.type,
    },
  });
};
