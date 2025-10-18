"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactUs = exports.getContactUsById = exports.getAllContactUs = exports.createContactUs = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const contact_us_model_1 = __importDefault(require("@src/models/feature-manage-modules-models/contact-us.model"));
// createContactUs
const createContactUs = (contactUsData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdContactUs = yield contact_us_model_1.default.create(contactUsData);
        logger_1.default.info('Contact Us created successfully', { createdContactUs });
        return createdContactUs;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
exports.createContactUs = createContactUs;
// getAllContactUs
const getAllContactUs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactUs = yield contact_us_model_1.default
            .find({})
            .populate('createdBy', 'name email')
            .exec();
        logger_1.default.info('Fetched all Contact Us profiles successfully', { contactUs });
        return contactUs;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
exports.getAllContactUs = getAllContactUs;
// getContactUsById
const getContactUsById = (contactUsId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactUs = yield contact_us_model_1.default
            .findById(contactUsId)
            .populate('createdBy', 'name email')
            .exec();
        logger_1.default.info('Fetched Contact Us profile successfully', { contactUs });
        return contactUs;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
exports.getContactUsById = getContactUsById;
// deleteContactUs
const deleteContactUs = (contactUsId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedContactUs = yield contact_us_model_1.default
            .findByIdAndDelete(contactUsId)
            .exec();
        logger_1.default.info('Deleted Contact Us profile successfully', {
            deletedContactUs,
        });
        return deletedContactUs;
    }
    catch (error) {
        logger_1.default.error(error);
        throw error;
    }
});
exports.deleteContactUs = deleteContactUs;
