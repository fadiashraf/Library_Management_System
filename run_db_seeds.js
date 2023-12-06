//  this file to create initial db
// create tables
//  seed admin ,books and authors table

const knex = require('knex');

const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile.js')[environment];

const initializeDatabase = async () => {
  const { database, ...connectionConfig } = config.connection;

  // Connect to the default database using mysql2
  const defaultConnection = knex({ ...config, connection: connectionConfig });

  // create a database if it does not already exist
  await defaultConnection.raw(`CREATE DATABASE IF NOT EXISTS ${database}`);

  // Connect to the actual application database
  const appConnection = knex(config);
  return appConnection;
};

const runMigrations = async () => {
  const connection = await initializeDatabase();

  // Run migrations
  await connection.migrate.latest();

  //  run seeds and create an admin
  await connection.seed.run();

  // Close the connection after migrations
  await connection.destroy();
};

// Example usage
runMigrations()
  .then(() => {
    console.log('Database migrations completed successfully.');
    process.exit();
  })
  .catch((error) => {
    console.error('Error running migrations:', error);
  });
