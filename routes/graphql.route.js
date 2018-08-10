module.exports = rapid => {
  const { graph, middleware } = rapid;

  rapid.api.post(
    '/graphql', 
    middleware.auth(), 
    rapid.middleware.graphql()
  );
};
