import { Databse } from "./db.js";
import { ResponseError } from "../error/responError.js";
import { userModel } from "./userDb.js";
import mongoose, { mongo } from 'mongoose';
const { model, Schema } = mongoose;
import jwt from 'jsonwebtoken';

const adminModel = model('admin', new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
    },
    token: {
        type: String,
        default: null
    },
    role: {
        type: String,
        trim: true,
        lowercase: true,
    }
}, {
    timestamps: true
}));
class Admin extends Databse {
    constructor() {
        super();

    };
    async #findAdmin() {
        return await adminModel.find().exec();
    }
    async #findListingUser() {
        return await userModel.find().select('-password').exec();
    }
    async loginAdmin(body) {
        const { email, password, role } = body;
        const finds = await this.#findAdmin();

        const selected = finds.find(el => el.email == email);
        if (!selected) throw new ResponseError(400, 'password or email incorrect');
        const compare = await this.comparePassword(password, selected.password);

        if (compare && selected.email == email) {
            const token = jwt.sign(
                { email: selected.email, username: selected.username, role: selected.role },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );
            await adminModel.updateOne({ email: email }, { $set: { token: token } })
            return {
                message: 'Login Successfully',
                token: token
            }
        } else {
            throw new ResponseError(400, 'password or email incorrect');
        }
    };
    async getAllListingUser(token, body) {
        const tokens = token && token.split(' ')[1];
        const finds = await this.#findAdmin();
        const selected = finds.find(el => el.token == tokens && el.email == body.email);

        if (!selected) throw new ResponseError(403, 'Invalid or expired token');
        else return await this.#findListingUser()
    }
}

const admins = new Admin()
export {
    admins,
    Admin
}