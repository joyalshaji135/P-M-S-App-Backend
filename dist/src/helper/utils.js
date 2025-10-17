"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.getMessageFromValidationError = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Validation Error Message Utility
const getMessageFromValidationError = (error) => error.details[0].message.replace(/"/g, '');
exports.getMessageFromValidationError = getMessageFromValidationError;
const uploadImage = (mainImage, localFolder) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mainImage || !Array.isArray(mainImage) || mainImage.length === 0) {
        throw new Error('Invalid file: missing buffer or mimetype.');
    }
    const file = mainImage[0];
    if (!file.buffer) {
        throw new Error('Invalid file: missing buffer.');
    }
    let imageName = '';
    const filename = `${Date.now()}.png`;
    try {
        if (!fs.existsSync(localFolder)) {
            fs.mkdirSync(localFolder, { recursive: true });
        }
        const filePath = path.join(localFolder, filename);
        yield fs.promises.writeFile(filePath, file.buffer);
        imageName = filePath;
    }
    catch (err) {
        console.error('Error saving file locally:', err);
        throw new Error('Error saving the file locally.');
    }
    return imageName;
});
exports.uploadImage = uploadImage;
