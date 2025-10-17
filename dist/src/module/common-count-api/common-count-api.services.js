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
exports.getAllDocumentFileCount = exports.getAllRecruitmentCount = exports.getAllGoogleMeetCount = exports.getAllEventCount = exports.getAllTeamMemberCount = exports.getAllTeamManagerCount = exports.getAllCompanyOwnerCount = void 0;
const commonCountApiRepository = __importStar(require("./common-count-api.repositors"));
// Company Owner Count Functions
const getAllCompanyOwnerCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyOwnerCount = yield commonCountApiRepository.getCompanyOwnersCount();
        return companyOwnerCount;
    }
    catch (error) {
        throw new Error('Fail to get Company Owner Count');
    }
});
exports.getAllCompanyOwnerCount = getAllCompanyOwnerCount;
// Team Manager Count Functions
const getAllTeamManagerCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamManagerCount = yield commonCountApiRepository.getTeamManagersCount();
        return teamManagerCount;
    }
    catch (error) {
        throw new Error('Fail to get Team Manager Count');
    }
});
exports.getAllTeamManagerCount = getAllTeamManagerCount;
// Team Member Count Functions
const getAllTeamMemberCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamMemberCount = yield commonCountApiRepository.getTeamMemberCount();
        return teamMemberCount;
    }
    catch (error) {
        throw new Error('Fail to get Team Member Count');
    }
});
exports.getAllTeamMemberCount = getAllTeamMemberCount;
// Event Count Functions
const getAllEventCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventCount = yield commonCountApiRepository.getEventCount();
        return eventCount;
    }
    catch (error) {
        throw new Error('Fail to get Event Count');
    }
});
exports.getAllEventCount = getAllEventCount;
// Google Meet Count Functions
const getAllGoogleMeetCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const googleMeetCount = yield commonCountApiRepository.getGoogleMeetCount();
        return googleMeetCount;
    }
    catch (error) {
        throw new Error('Fail to get Google Meet Count');
    }
});
exports.getAllGoogleMeetCount = getAllGoogleMeetCount;
// Recruitment Count Functions
const getAllRecruitmentCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recruitmentCount = yield commonCountApiRepository.RecruitmentCount();
        return recruitmentCount;
    }
    catch (error) {
        throw new Error('Fail to get Recruitment Count');
    }
});
exports.getAllRecruitmentCount = getAllRecruitmentCount;
// File Document Count Functions
const getAllDocumentFileCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentFileCount = yield commonCountApiRepository.documentFileCount();
        return documentFileCount;
    }
    catch (error) {
        throw new Error('Fail to get Document File Count');
    }
});
exports.getAllDocumentFileCount = getAllDocumentFileCount;
