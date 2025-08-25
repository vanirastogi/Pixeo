import mongoose, { connections } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        _id : {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        full_name : {
            type: String,
            required: true,
            trim: true
        },
        username : {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        bio : {
            type: String,
            default: "",
            trim: true
        },
        profile_picture : {
            type: String,
            default: ""
        },
        cover_photo : {
            type: String,
            default: ""
        },
        location : {
            type: String,
            default: "",
            trim: true
        },
        followers : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        following : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        connections : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User" 
            }
        ],
        password : {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken : {
            type: String,
            default: ""
        }

    },
    { 
        timestamps: true,
        minimize: false 
    }
)
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAcessToken = function () {
    return jwt.sign(
        {
            id : this._id,
            username: this.username,
            full_name: this.full_name,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", userSchema);