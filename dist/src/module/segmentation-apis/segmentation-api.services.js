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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectTaskPatch = exports.getAllFileDocuments = exports.getAllGoogleMeetings = exports.getAllIndustryProjects = exports.projectAssignedClientServices = exports.taskAssignedClientServices = void 0;
const logger_1 = __importDefault(require("@src/utils/logger"));
const segmentationApiRepository = __importStar(require("./segmentation-api.repository"));
// taskAssignedClientServices
const taskAssignedClientServices = (client_id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting Task Wise Client list with ID ${client_id}`);
    return segmentationApiRepository.taskAssignedClientRepository(client_id);
});
exports.taskAssignedClientServices = taskAssignedClientServices;
// projectAssignedClientServices
const projectAssignedClientServices = (client_id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting Project Wise Client list with ID ${client_id}`);
    return segmentationApiRepository.projectAssignedClientRepository(client_id);
});
exports.projectAssignedClientServices = projectAssignedClientServices;
// getAllIndustryProjects
const getAllIndustryProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all industry projects');
    return segmentationApiRepository.getAllIndustryProjects();
});
exports.getAllIndustryProjects = getAllIndustryProjects;
// getAllGoogleMeetings
const getAllGoogleMeetings = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all google meetings');
    return segmentationApiRepository.getAllGoogleMeetings();
});
exports.getAllGoogleMeetings = getAllGoogleMeetings;
// getAllFileDocuments
const getAllFileDocuments = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all file documents');
    return segmentationApiRepository.getAllFileDocuments();
});
exports.getAllFileDocuments = getAllFileDocuments;
// updateProjectTask this function using only two fields update using patch
const updateProjectTaskPatch = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Updating project', updateData);
    return segmentationApiRepository.updateProjectTaskPatch(id, updateData);
});
exports.updateProjectTaskPatch = updateProjectTaskPatch;
