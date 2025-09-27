import Joi from "joi";


const loginAdminValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
    role: Joi.string().min(3).max(10).required()
})

const listingUserValidation = Joi.string().min(3).required();
export {
    loginAdminValidation,
    listingUserValidation
}