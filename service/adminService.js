import { admins } from "../database/adminDb.js";
import { instanceResponseError } from "../error/responError.js";
import { listingUserValidation, loginAdminValidation } from "../validation/adminValidation.js";
import { validationSchema } from "../validation/validationSchema.js";
const loginAdminService = async (request) => {
    try {
        const adminRequest = await validationSchema(loginAdminValidation, request);
        const result = await admins.loginAdmin(adminRequest.value);
        return result
    } catch (error) {
        const resultError = await instanceResponseError(error);
        throw resultError;
    }
}

const listingUserService = async (request, body) => {
    try {
        const adminRequest = await validationSchema(listingUserValidation, request);
        const result = await admins.getAllListingUser(adminRequest.value, body);
        return result;
    } catch (error) {
        const resultError = await instanceResponseError(error);
        throw resultError;
    }
}

export {
    loginAdminService,
    listingUserService
}