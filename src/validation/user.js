import Joi from "joi";

const schemas = {
  register: Joi.object({
    name: Joi.string().trim().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  }),
  login: Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  }),
};

const validate = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) {
    const errorMessage = error.details[0].message;
    return { isValid: false, error: errorMessage };
  }
  return { isValid: true };
};

export const validateRegister = (req, res, next) => {
  const { isValid, error } = validate(schemas.register, req.body);
  if (!isValid) {
    return res.status(400).json({ error });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { isValid, error } = validate(schemas.login, req.body);
  if (!isValid) {
    return res.status(400).json({ error });
  }
  next();
};
