import Joi from "joi"

export const movieFetchValidatorSchema = Joi.object({
    name: Joi.string().trim().min(2).max(30).required(),
})