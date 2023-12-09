const Yup = require('yup');

const loginWithEmailSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
}).noUnknown();

const signUpSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(5),
  name: Yup.string().required().min(2),
}).noUnknown();
module.exports = { loginWithEmailSchema, signUpSchema };
