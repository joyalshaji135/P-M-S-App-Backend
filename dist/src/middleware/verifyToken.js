"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const responseMessage_1 = require("@constants/responseMessage");
(0, dotenv_1.config)();
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: responseMessage_1.message.INVALID_TOKEN });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp <= currentTimestamp) {
            return res.status(401).json({ message: responseMessage_1.message.TOKEN_EXPIRED });
        }
        req.userId = decoded._id;
        req.role = decoded.role || 'user';
        next();
    }
    catch (err) {
        console.error('JWT Verification Error:', err.message);
        return res.status(400).json({ message: responseMessage_1.message.INVALID_TOKEN });
    }
};
const verifyTokenMiddleware = (req, res, next) => {
    verifyToken(req, res, next);
};
exports.default = verifyTokenMiddleware;
