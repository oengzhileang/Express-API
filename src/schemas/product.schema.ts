import Joi from "joi";

export const ProductCreateSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  category: Joi.string().required(),
  price: Joi.number().required().positive(),
  stock: Joi.number().required().positive(),
});
