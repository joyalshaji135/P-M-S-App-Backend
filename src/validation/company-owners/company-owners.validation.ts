import Joi from 'joi';

export const companyOwnersValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 3 characters long.',
      'string.max': 'Name must be at most 50 characters long.',
    }),

    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format.',
      'string.empty': 'Email is required.',
    }),

    phone: Joi.string()
      .pattern(/^\+\d{10,15}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Phone number must be in international format (e.g., +1234567890).',
      }),

    role: Joi.string()
      .valid('company-owners') // Only allows "company-owners"
      .required()
      .messages({
        'any.only': "Invalid role. Only 'company-owners' is allowed.",
      }),


    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      district: Joi.string().required(),
      zipCode: Joi.string()
        .pattern(/^\d{5}$/)
        .required()
        .messages({
          'string.pattern.base': 'Zip code must be a 5-digit number.',
        }),
    }).required(),

    preferences: Joi.object({
      newsletter: Joi.boolean().required(),
      notifications: Joi.boolean().required(),
    }).required(),

    company: Joi.object({
      name: Joi.string().required(),
      registrationNumber: Joi.string().required(),
      website: Joi.string().uri().required().messages({
        'string.uri': 'Invalid website URL format.',
      }),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^\+\d{10,15}$/)
        .required()
        .messages({
          'string.pattern.base':
            'Phone number must be in international format (e.g., +1234567890).',
        }),
      industry: Joi.string().required(),
    }).required(),

    dateOfBirth: Joi.date().iso().required().messages({
      'date.base': 'Invalid date format.',
      'date.iso': 'Date of birth must be in ISO format (YYYY-MM-DD).',
    }),

    gender: Joi.string().valid('male', 'female', 'other').required(),


    lastLogin: Joi.date().iso().optional().messages({
      'date.base': 'Invalid date format.',
      'date.iso':
        'Last login must be in ISO format (YYYY-MM-DDTHH:MM:SS.SSSZ).',
    }),
  });
  // Sample Validation
  return schema.validate(data, { abortEarly: false });
};
