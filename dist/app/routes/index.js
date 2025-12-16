"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = require("../modules/product/product.route");
const newsletter_route_1 = require("../modules/newsletter/newsletter.route");
const video_route_1 = require("../modules/video/video.route");
const article_route_1 = require("../modules/articles/article.route");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/products",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/newsletter",
        route: newsletter_route_1.NewsletterRoutes,
    },
    {
        path: "/videos",
        route: video_route_1.VideoRouter,
    },
    {
        path: "/articles",
        route: article_route_1.ArticleRoutes,
    },
    {
        path: "/user",
        route: user_route_1.UserRouter,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
