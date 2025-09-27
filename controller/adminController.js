import { listingUserService, loginAdminService } from "../service/adminService.js";
import { ResponseError } from "../error/responError.js";
const loginAdminController = async (req, res) => {
    try {
        if (req.body.role == 'admin') {
            const result = await loginAdminService(req.body);
            return res.status(200).json({
                data: result,
                statusCode: 200
            })
        } else {
            throw new ResponseError(400, 'Invalid Role')
        }
    } catch (err) {
        return res.status(err.status).json({
            error: {
                message: err.message,
                statusCode: err.status
            }
        })
    }
};

const listingUser = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const result = await listingUserService(authHeader, req.user);
        res.status(200).json({
            data: result,
            statusCode: 200
        })
    } catch (err) {
        return res.status(err.status).json({
            error: {
                message: err.message,
                statusCode: err.status
            }
        })
    }
}

export {
    loginAdminController,
    listingUser
}