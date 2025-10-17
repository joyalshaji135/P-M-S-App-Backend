"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const i18n_1 = require("i18n");
// Configure i18n instance
const i18n = new i18n_1.I18n({
    locales: ['en', 'de'], // List of supported locales
    directory: path_1.default.join(__dirname, '../locales'), // Path to translation files
    updateFiles: false, // Prevent automatic updates to translation files
});
exports.default = i18n;
