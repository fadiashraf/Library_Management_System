const config = require('./config/config');

require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: config.mysqlDB.host || 'localhost',
      port: config.mysqlDB.port || 3306,
      user: config.mysqlDB.username,
      password: config.mysqlDB.password,
      database: config.mysqlDB.databaseName,
      charset: 'utf8mb4',
    },
    debug: true,
    migrations: {
      directory: 'data/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: 'data/seeds',
      tableName: 'seeds',
    },
  },
  production: {
    client: 'mysql2',
    connection: {
      host: config.mysqlDB.host,
      port: config.mysqlDB.port,
      user: config.mysqlDB.username,
      password: config.mysqlDB.password,
      database: config.mysqlDB.databaseName,
      charset: 'utf8mb4',
    },
    migrations: {
      directory: 'data/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: 'data/seeds',
      tableName: 'seeds',
    },
  },
};
