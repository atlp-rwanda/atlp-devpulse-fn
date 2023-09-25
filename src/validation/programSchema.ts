import joi from "joi";

const programSchema = joi.object({
  title: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
  description: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
  mainObjective: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
  modeOfExecution: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
  requirements: joi.array(),
});

export default programSchema;
