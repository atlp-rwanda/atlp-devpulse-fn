import joi from "joi";

//blogs validations
const blogSchema = joi.object({
  title: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
  content: joi.string().required(),
  tags: joi.array().required(),
  coverImage: joi.required(),
  images: joi.array(),
});

export default blogSchema;
