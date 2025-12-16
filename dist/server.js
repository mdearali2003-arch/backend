"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app/app"));
const database_1 = __importDefault(require("./app/config/database"));
const PORT = process.env.PORT || 5000;
async function start() {
    try {
        await (0, database_1.default)("mongodb+srv://earali:161375@3Mn@cluster0.ernpzdf.mongodb.net/earali?appName=Cluster0");
        app_1.default.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}
start();
