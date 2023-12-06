const Yup = require('yup');

const createAuthorSchema = Yup.object({
  name: Yup.string().required(),
});

module.exports = { createAuthorSchema };
