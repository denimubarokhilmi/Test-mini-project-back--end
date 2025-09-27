import { Databse } from "./db.js";
import { ResponseError } from "../error/responError.js";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { Admin } from "./adminDb.js";

const { model, Schema } = mongoose;

const userModel = model('user', new Schema({
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

class User extends Databse {
    constructor() {
        super()
    };

    async #findUser() {
        return await userModel.find().exec();
    }

    async registerUser(body) {
        try {
            const result = await this.createDoc(body, userModel);
            if (result) {
                return {
                    message: 'Registration was successful, please login'
                }
            }
        } catch (error) {
            throw new ResponseError(409, 'name or email already exists');
        }
    }

    async loginUser(body) {
        const { email, password } = body;
        const finds = await this.#findUser();
        const selected = finds.find(el => el.email == email);
        if (!selected) throw new ResponseError(400, 'password or email incorrect');

        const compare = await this.comparePassword(password, selected.password);
        if (compare && selected.email == email) {
            const token = jwt.sign(
                { email: selected.email, username: selected.username, role: selected.role },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );
            await userModel.updateOne({ email: email }, { $set: { token: token } })
            return {
                message: 'Login Successfully',
                token: token
            }
        } else {
            throw new ResponseError(400, 'password or email incorrect');
        }
    }
    async getUser(token, body) {
        const tokens = token && token.split(' ')[1];
        const finds = await this.#findUser();
        const selected = finds.find(el => el.token == tokens && el.email == body.email);

        if (!selected) throw new ResponseError(403, 'Invalid or expired token');
        else return {
            id: selected._id,
            username: selected.username,
            email: selected.email,
            role: selected.role

        }
    }
}

const users = new User();
export { users, userModel };



