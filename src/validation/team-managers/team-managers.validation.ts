import Joi from 'joi';

export const teamManagersValidation = (data: any) => {
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
      .pattern(/^\+91\d{10}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Phone number must be a valid Indian number in international format (e.g., +919876543210).',
      }),

    role: Joi.string()
      .valid('admin', 'company-owners', 'team-managers', 'team-members')
      .required()
      .messages({
        'any.only':
          "Invalid role. Allowed roles: 'admin', 'company-owners', 'team-managers', 'team-members'.",
      }),

    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long.',
      'string.empty': 'Password is required.',
    }),

    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Passwords do not match.',
      }),

    isDefault: Joi.boolean().required(),

    dateOfBirth: Joi.date().iso().required().messages({
      'date.base': 'Invalid date format.',
      'date.iso': 'Date of birth must be in ISO format (YYYY-MM-DD).',
    }),

    gender: Joi.string().valid('male', 'female', 'other').required(),

    profilePicture: Joi.string().uri().optional().messages({
      'string.uri': 'Invalid profile picture URL format.',
    }),

    lastLogin: Joi.date().iso().optional().messages({
      'date.base': 'Invalid date format.',
      'date.iso':
        'Last login must be in ISO format (YYYY-MM-DDTHH:MM:SS.SSSZ).',
    }),

    preferences: Joi.object({
      newsletter: Joi.boolean().required(),
      notifications: Joi.boolean().required(),
    }).required(),

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

    skills: Joi.array()
      .items(
        Joi.object({
          skillName: Joi.string().required(),
          proficiency: Joi.string()
            .valid('beginner', 'intermediate', 'advanced', 'expert')
            .required(),
          yearsOfExperience: Joi.number().min(0).required(),
          certification: Joi.string().optional(),
        }),
      )
      .required()
      .messages({
        'array.base': 'Skills must be an array of objects.',
      }),

    company: Joi.object({
      name: Joi.string().required(),
      registrationNumber: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^\+91\d{10}$/)
        .required()
        .messages({
          'string.pattern.base':
            'Phone number must be a valid Indian number in international format (e.g., +919876543210).',
        }),
      industry: Joi.string().required(),
      website: Joi.string().uri().required().messages({
        'string.uri': 'Invalid website URL format.',
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
    }).required(),
  });

  // Validate data
  return schema.validate(data, { abortEarly: false });
};
