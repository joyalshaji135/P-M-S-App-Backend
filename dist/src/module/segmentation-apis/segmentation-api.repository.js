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
exports.getAllFileDocuments = exports.getAllGoogleMeetings = exports.getAllIndustryProjects = exports.projectAssignedClientRepository = exports.taskAssignedClientRepository = void 0;
const task_role_models_1 = __importDefault(require("@src/models/master-workspace-modules-models/task-role.models"));
const logger_1 = __importDefault(require("@src/utils/logger"));
const industry_projects_models_1 = __importDefault(require("@src/models/master-workspace-modules-models/industry-projects.models"));
const google_meets_models_1 = __importDefault(require("@src/models/feature-manage-modules-models/google-meets.models"));
const document_files_models_1 = __importDefault(require("@src/models/feature-manage-modules-models/document-files.models"));
// taskAssignedClientServices : client id using assigned task listing
const taskAssignedClientRepository = (client_id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting Task Wise Client list with ID ${client_id}`);
    return task_role_models_1.default
        .find({ isDeleted: false, resourceName: client_id })
        .populate('resourceName', 'name email role phone')
        .populate('project', 'projectName industry description projectStatus')
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.taskAssignedClientRepository = taskAssignedClientRepository;
// projectAssignedClientRepository : client id using assigned project listing
const projectAssignedClientRepository = (client_id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting Project Wise Client list with ID ${client_id}`);
    return industry_projects_models_1.default
        .find({ isDeleted: false, resourceName: client_id })
        .populate('customer', 'name email role phone')
        .populate('priority', 'name code')
        .populate('industry', 'name code')
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .exec();
});
exports.projectAssignedClientRepository = projectAssignedClientRepository;
// getAllIndustryProjects
const getAllIndustryProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    return industry_projects_models_1.default
        .find({ isDeleted: false })
        .populate('customer', 'name email role phone')
        .populate('industry', 'name code')
        .populate('priority', 'name code')
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .sort({ createdAt: -1 });
});
exports.getAllIndustryProjects = getAllIndustryProjects;
// getAllGoogleMeetings
const getAllGoogleMeetings = () => __awaiter(void 0, void 0, void 0, function* () {
    return google_meets_models_1.default
        .find({ isDeleted: false })
        .populate('customer', 'name email role phone')
        .populate('industryProject', 'projectName code')
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .sort({ createdAt: -1 });
});
exports.getAllGoogleMeetings = getAllGoogleMeetings;
// getAllFileDocuments
const getAllFileDocuments = () => __awaiter(void 0, void 0, void 0, function* () {
    return document_files_models_1.default
        .find({ isDeleted: false })
        .populate('customer', 'name email role phone')
        .populate('industryProject', 'projectName code')
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .sort({ createdAt: -1 });
});
exports.getAllFileDocuments = getAllFileDocuments;
