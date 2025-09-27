import { validationSchema } from "../validation/validationSchema.js";
import { loginValidation, registerValidation, userMeValidation } from "../validation/userValidation.js";
import { instanceResponseError } from "../error/responError.js";
import { users } from "../database/userDb.js";
const registerService = async (request) => {
    try {
        const userRequest = await validationSchema(registerValidation, request);
        const result = await users.registerUser(userRequest.value)
        return result;
    } catch (error) {
        const resultError = await instanceResponseError(error);
        throw resultError;
    }

}
const loginService = async (request) => {
    try {
        const userRequest = await validationSchema(loginValidation, request);
        const result = await users.loginUser(userRequest.value)
        return result;
    } catch (error) {
        const resultError = await instanceResponseError(error);
        throw resultError;
    }
}
const getUserMeService = async (request, body) => {
    try {
        const userRequest = await validationSchema(userMeValidation, request);
        const result = await users.getUser(userRequest.value, body)
        return result;
    } catch (error) {
        const resultError = await instanceResponseError(error);
        throw resultError;
    }
}
export {
    registerService,
    loginService,
    getUserMeService
}