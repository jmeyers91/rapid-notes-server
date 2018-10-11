const { env } = process;

module.exports = {
  webserver: {
    port: env['PORT'] || 9090,
    publicPath: 'public',
  },
  database: {
    ssl: !!env['DATABASE_URL'],
    connection: env['DATABASE_URL'] || {
      user: env['USER'] || 'root',
      password: '',
      database: 'rapid_notes'
    }
  },
};
