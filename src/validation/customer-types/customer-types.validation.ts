import Joi from 'joi';

export const customerTypeValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        'string.empty': 'Name is required.',
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name must be at most 50 characters long.',
        'string.pattern.base': 'Name must contain only letters and spaces.',
      }),
  });

  // Sample Validation
  return schema.validate(data, { abortEarly: false });
};
