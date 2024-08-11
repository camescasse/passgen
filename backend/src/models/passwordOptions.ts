import Joi from 'joi';

interface PasswordOptions {
  length?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
}

function validatePasswordOptions(options: PasswordOptions) {
  const schema = Joi.object({
    length: Joi.number().min(4).max(40).required(),
    uppercase: Joi.boolean(),
    lowercase: Joi.boolean(),
    numbers: Joi.boolean(),
    symbols: Joi.boolean(),
  });

  return schema.validate(options);
}

export { PasswordOptions, validatePasswordOptions };
