import joi from 'joi';

// Function to validate the login form data
export const loginFormValidation = (data: any) => {
  const schema = joi.object({
    email: joi
      .string()
      .pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org)$/))
      .required()
      .messages({
        'string.pattern.base':
          'Email must be a valid address ending with .com, .net, or .org',
      }),
    password: joi.string().min(4).max(30).required(),
    role: joi
      .string()
      .valid('team-members', 'team-managers', 'company-owners', 'admin')
      .required(),
  });

  return schema.validate(data);
};
