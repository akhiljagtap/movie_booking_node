import Joi from "joi"

export const movieValidationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  description: Joi.string().trim().max(500).required(),
  cast: Joi.array().items(Joi.string().trim()).min(1).required(),
  crew: Joi.array().items(Joi.string().trim()),
  format: Joi.array().items(Joi.string().valid('2D','3D','IMAX')).min(1).required(),
  director: Joi.string().trim().required(),
  language: Joi.string().trim().required(),
  duration: Joi.number().positive().required(),
  releaseDate: Joi.date().required(),
  genre: Joi.array().items(Joi.string().trim()).required(),
  rating: Joi.number().min(0).max(10),
  posterUrl: Joi.string().uri(),
  status: Joi.string().valid('comming_soon','released','stopped').required()

})

