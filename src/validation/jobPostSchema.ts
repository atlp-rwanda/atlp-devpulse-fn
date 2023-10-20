import joi from 'joi';

const jobPostSchema = joi.object({
  title: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
  program: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
  cycle: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
  cohort: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
  description: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
});

export default jobPostSchema;
