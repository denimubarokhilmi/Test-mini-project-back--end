import { getUserMeService, loginService, registerService } from "../service/userService.js";
const pathDeniedAccess = '/api/user/auth/register'
import { ResponseError } from "../error/responError.js";
const registerController = async (req, res,) => {
    try {
        if (req.path == pathDeniedAccess && req.body.role == 'admin') {
            throw new ResponseError(400, 'the path you are aiming for and the role you are aiming for are blocked');

        } else {
            const result = await registerService(req.body);
            res.status(200).json({
                data: result,
                statusCode: 200
            })
        }

    } catch (err) {
        res.status(err.status).json({
            error: {
                message: err.message,
                statusCode: err.status
            }
        })
    }
};
const loginController = async (req, res) => {
    try {
        const result = await loginService(req.body);
        if (result) {
            return res.status(200).json({
                data: result,
                statusCode: 200
            })
        }
    } catch (err) {
        return res.status(err.status).json({
            error: {
                message: err.message,
                statusCode: err.status
            }
        })
    }
}

const getUserMeController = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const result = await getUserMeService(authHeader, req.user);
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
    registerController,
    loginController,
    getUserMeController
}