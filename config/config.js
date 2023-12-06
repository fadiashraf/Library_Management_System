require('dotenv').config();
const yup = require('yup');

const envVarsSchema = yup.object({
  NODE_ENV: yup.string().oneOf(['production', 'development', 'test']).default('development'),
  PORT: yup.number().default(3000),
  JWT_SECRET: yup.string().required().default('JWT_SECRET'),
  JWT_ACCESS_EXPIRATION_MINUTES: yup.number().default(60),
  ISSUER: yup
    .string()
    .required()
    .default('http://dev.library.com')
    ,
  MYSQL_USERNAME: yup.string().required(),
  MYSQL_PASSWORD: yup.string().required(),
  MYSQL_DATABASE: yup.string().required(),
  MYSQL_HOST: yup.string().required(),
  MYSQL_PORT: yup.number().required().default(3306),
  MEILI_URL: yup.string().required().default('http://dev.library.com'),
  MEILI_API_KEY: yup.string().required().default('testKey'),
});

let envVars;
try {
  envVars = envVarsSchema.validateSync(process.env);
} catch (error) {
  console.log(error);
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mysqlDB: {
    username: envVars.MYSQL_USERNAME,
    password: envVars.MYSQL_PASSWORD,
    databaseName: envVars.MYSQL_DATABASE,
    host: envVars.MYSQL_HOST,
    port: envVars.MYSQL_PORT,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    issuer: envVars.ISSUER,
  },

  meili: {
    MEILI_URL: envVars.MEILI_URL,
    MEILI_API_KEY: envVars.MEILI_API_KEY,
  },
};
