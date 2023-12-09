const yup = require('yup');

const createUserSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
}).noUnknown();

const updateUserSchema = yup.object({
  email: yup.string().email(),
  name: yup.string().min(2),
}).noUnknown();

const getUserSchema = yup.object({
  id: yup.number().integer(),
  email: yup.string().email(),
  name: yup.string().min(2),
}).noUnknown();
module.exports = { createUserSchema, updateUserSchema, getUserSchema };
