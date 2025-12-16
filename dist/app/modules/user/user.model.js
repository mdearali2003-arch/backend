"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ["superAdmin", "admin", "user"],
        default: "user",
    },
    needsPasswordChange: {
        type: Boolean,
        default: false,
    },
    passwordChangeAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
// pre save middleware
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password"))
        return next();
    user.password = await bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds || 10));
    next();
});
// remove password after save
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
// static methods
userSchema.statics.isUserExistsByEmail = async function (email) {
    return await this.findOne({ email }).select("+password");
};
userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
    return await bcrypt_1.default.compare(plainTextPassword, hashedPassword);
};
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp, jwtIssuedTimestamp) {
    const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};
exports.User = (0, mongoose_1.model)("User", userSchema);
