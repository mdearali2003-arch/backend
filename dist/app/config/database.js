"use strict";
// import mongoose from "mongoose";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const connectDB = async (mongoUri: string) => {
//   if (!mongoUri) throw new Error("MONGO_URI is not provided");
//   await mongoose.connect(mongoUri, {
//     // options if needed
//   });
//   console.log("MongoDB connected");
// };
// export default connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async (mongoUri) => {
    if (!mongoUri)
        throw new Error("MONGO_URI is not provided");
    if (!global._mongoose) {
        global._mongoose = { conn: null, promise: null };
    }
    if (global._mongoose.conn) {
        // already connected
        return global._mongoose.conn;
    }
    if (!global._mongoose.promise) {
        global._mongoose.promise = mongoose_1.default
            .connect(mongoUri)
            .then((mongooseInstance) => mongooseInstance);
    }
    global._mongoose.conn = await global._mongoose.promise;
    console.log("MongoDB connected (cached)");
    return global._mongoose.conn;
};
exports.default = connectDB;
