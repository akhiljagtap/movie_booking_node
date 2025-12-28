import Joi from "joi";

export const authValidationSchema = Joi.object({
    username: Joi.string().trim().required().min(3).max(20),
    email: Joi.string().trim().required().email({tlds:{allow:false}}),
    password: Joi.string().required().min(6).max(16)
        .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]+$")).
        messages({
            "string.pattern.base":
            "password must contain atlast one letter and one number"
        })
})

export const loginValidationScheme = Joi.object({
    email: Joi.string().trim().required().email({tlds:{allow:false}}),
     password: Joi.string().required().min(6).max(16)
        .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]+$")).
        messages({
            "string.pattern.base":
            "password must contain atlast one letter and one number"
        })
})