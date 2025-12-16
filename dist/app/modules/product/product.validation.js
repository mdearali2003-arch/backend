"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        price: zod_1.z.number(),
        description: zod_1.z.string().optional(),
        discountPrice: zod_1.z.number().optional(),
        categories: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
