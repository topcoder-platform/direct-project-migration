module.exports = {
  LOG_FILENAME: 'app.log',
  BATCH_SIZE: 100,
  AUTH0_URL: process.env.AUTH0_URL,
  AUTH0_PROXY_SERVER_URL: process.env.AUTH0_PROXY_SERVER_URL,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || 'https://www.topcoder-dev.com',
  TOKEN_CACHE_TIME: process.env.TOKEN_CACHE_TIME || 90,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,

  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  PROJECTS_API_URL: process.env.PROJECTS_API_URL || 'https://api.topcoder-dev.com/v5/projects',

  POSTGRES: {
    DB_SCHEMA_NAME: process.env.DB_SCHEMA_NAME || 'public',
    POSTGRES_URL: process.env.POSTGRES_URL || 'postgres://postgres:test@127.0.0.1:54320/postgres'
  },
  INFORMIX: {
    server: process.env.INFORMIX_SERVER || 'informixoltp_tcp', // informix server
    database: process.env.INFORMIX_DATABASE || 'tcs_catalog', // informix database
    host: process.env.INFORMIX_HOST || 'localhost', // host
    protocol: process.env.INFORMIX_PROTOCOL || 'onsoctcp',
    port: process.env.INFORMIX_PORT || '2021', // port
    db_locale: process.env.INFORMIX_DB_LOCALE || 'en_US.57372',
    user: process.env.INFORMIX_USER || 'informix', // user
    password: process.env.INFORMIX_PASSWORD || '1nf0rm1x', // password
    maxsize: parseInt(process.env.MAXSIZE) || 0,
    minpool: parseInt(process.env.MINPOOL, 10) || 1,
    maxpool: parseInt(process.env.MAXPOOL, 10) || 60,
    idleTimeout: parseInt(process.env.IDLETIMEOUT, 10) || 3600,
    timeout: parseInt(process.env.TIMEOUT, 10) || 30000
  },

  AMAZON: {
    // Uncomment for local deployment
    // AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || 'FAKE_ACCESS_KEY', // aws access key
    // AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'FAKE_SECRET_ACCESS_KEY', // aws secret key
    AWS_REGION: process.env.AWS_REGION || 'ap-northeast-1', // aws region
    IS_LOCAL_DB: process.env.IS_LOCAL_DB ? process.env.IS_LOCAL_DB === 'true' : true, // true or uninitialize if we use local instance
  }
}
