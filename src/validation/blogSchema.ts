import joi from "joi";

const blogSchema = joi.object({
  title: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
  content: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
  tags: joi.array().required(),
  coverImage: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
  images: joi.array(),
});

export default blogSchema;
