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
exports.documentFileCount = exports.RecruitmentCount = exports.getGoogleMeetCount = exports.getEventCount = exports.getTeamMemberCount = exports.getTeamManagersCount = exports.getCompanyOwnersCount = void 0;
// import this Models
const customer_models_1 = __importDefault(require("@src/models/master-manage-modules-models/customer.models"));
const event_programs_models_1 = __importDefault(require("@src/models/feature-manage-modules-models/event-programs.models"));
const google_meets_models_1 = __importDefault(require("@src/models/feature-manage-modules-models/google-meets.models"));
const recruitment_posts_models_1 = __importDefault(require("@src/models/feature-manage-modules-models/recruitment-posts.models"));
const document_files_models_1 = __importDefault(require("@src/models/feature-manage-modules-models/document-files.models"));
// Company Owner Count Functions
const getCompanyOwnersCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.countDocuments({
        isDeleted: false,
        role: 'company-owners', // Add role filter
    });
});
exports.getCompanyOwnersCount = getCompanyOwnersCount;
// Team Manager Count Functions
const getTeamManagersCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.countDocuments({
        role: 'team-managers',
        isDeleted: false,
    });
});
exports.getTeamManagersCount = getTeamManagersCount;
// Team Member Count Functions
const getTeamMemberCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.countDocuments({
        role: 'team-members',
        isDeleted: false,
    });
});
exports.getTeamMemberCount = getTeamMemberCount;
// Event Count Functions
const getEventCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return event_programs_models_1.default.countDocuments({
        isDeleted: false,
    });
});
exports.getEventCount = getEventCount;
// Google Meet Count Functions
const getGoogleMeetCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return google_meets_models_1.default.countDocuments({
        isDeleted: false,
    });
});
exports.getGoogleMeetCount = getGoogleMeetCount;
// Recruitment Count Functions
const RecruitmentCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return recruitment_posts_models_1.default.countDocuments({
        isDeleted: false,
    });
});
exports.RecruitmentCount = RecruitmentCount;
// File Document Count Functions
const documentFileCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return document_files_models_1.default.countDocuments({
        isDeleted: false,
    });
});
exports.documentFileCount = documentFileCount;
