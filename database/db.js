import mongoose, { mongo } from 'mongoose';
const { Schema, model } = mongoose;
import bcrypt from "bcrypt";

const uri = process.env.connection_mongo;

class Databse {
    #connect = mongoose.connect(uri)
    constructor() {
    };

    async hashed(pass) {
        return await bcrypt.hash(pass, 10)
    };
    async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    async createDoc(body, model) {
        let { username, email, password, confirmPassword, role } = body;
        password = await this.hashed(password);
        const result = await model.create({
            username,
            email,
            password,
            role
        });
        return result;
    }
}
const dbs = new Databse()
export {
    Databse
}