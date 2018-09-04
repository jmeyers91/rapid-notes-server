module.exports = {
  webserver: {
    port: 9090,
    publicPaths: ['public'],
  },
  database: {
    connection: {
      user: process.env.USER || 'root',
      password: '',
      database: 'rapid_notes'
    }
  }
};
