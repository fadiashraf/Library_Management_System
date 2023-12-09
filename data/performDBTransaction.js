const { Model } = require('objection');
const knex = require('./index');
const logger = require('../config/logger');
Model.knex(knex);

const performDBTransaction = async (queryFunctionsArray) => {
  try {
    await Model.transaction(async (trx) => {
      // Execute each query function with the transaction
      const queryPromises = queryFunctionsArray.map((queryFunction) => queryFunction(trx));

      // Use Promise.all to wait for all queries to complete
      await Promise.all(queryPromises);

      // If everything is successful, commit the transaction
      await trx.commit();
      // If there's an error, the transaction will automatically be rolled back
    });
    logger.info('Transaction successful');
  } catch (error) {
    logger.error(error);
    throw new Error('something wrong happened');
  }
};

module.exports = performDBTransaction;
