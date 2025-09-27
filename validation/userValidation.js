import Joi from "joi";

const registerValidation = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(100).required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({ "any.only": "Confirm the password must be the same " }),
    role: Joi.string().default('user')
});

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required()
})

const userMeValidation = Joi.string().min(3).required();
export {
    registerValidation,
    loginValidation,
    userMeValidation
}