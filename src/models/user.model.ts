import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from "../../config/default";

export interface UserDocument extends mongoose.Document {
    email: string,
    username: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(password: string): Promise<boolean>
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true
        },
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        }
    }, 
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next: (err?: Error) => void) {
    let user = this as UserDocument;

    if(!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.saltWorkFactor);

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(password, user.password).catch(error => false);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;