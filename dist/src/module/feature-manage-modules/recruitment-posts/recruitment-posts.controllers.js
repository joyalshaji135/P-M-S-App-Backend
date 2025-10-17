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
exports.updateRecruitmentPostStatus = exports.getAllRecruitmentPosts = exports.getRecruitmentPostById = exports.deleteRecruitmentPostProfile = exports.editRecruitmentPostProfile = exports.createRecruitmentPostProfile = void 0;
const recruitmentPostService = __importStar(require("./recruitment-posts.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const createRecruitmentPostProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const name = req.body.name;
        const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
        const lookupType = lookup_1.LookupTypes.RECRUITMENT_POST;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const recruitmentPostData = Object.assign(Object.assign({ code,
            nameAlias }, req.body), { createdBy: req.userId });
        // Add Validation for RecruitmentPost
        // const { error } = recruitmentPostValidation(req.body);
        // if (error) {
        //   return next(respondError(getMessageFromValidationError(error)));
        // }
        const createdRecruitmentPost = yield recruitmentPostService.createRecruitmentPost(recruitmentPostData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.RECRUITMENT_POST_CREATED_SUCCESS,
            recruitmentPost: createdRecruitmentPost,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createRecruitmentPostProfile = createRecruitmentPostProfile;
const editRecruitmentPostProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const recruitmentPostData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        // Get RecruitmentPost By Id from the database
        const recruitmentPost = yield recruitmentPostService.getRecruitmentPostById(id);
        if (!recruitmentPost) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.RECRUITMENT_POST_NOT_FOUND,
            });
        }
        if (req.body.name) {
            const name = req.body.name;
            const nameAlias = name
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/\./g, '');
            recruitmentPostData.nameAlias = nameAlias;
        }
        const existingRecruitmentPost = yield recruitmentPostService.getRecruitmentPostById(id);
        if (!existingRecruitmentPost) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.RECRUITMENT_POST_NOT_FOUND,
            });
        }
        const updatedRecruitmentPost = yield recruitmentPostService.editRecruitmentPost(id, recruitmentPostData);
        if (!updatedRecruitmentPost) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.RECRUITMENT_POST_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.RECRUITMENT_POST_UPDATED_SUCCESS,
            recruitmentPost: updatedRecruitmentPost,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.editRecruitmentPostProfile = editRecruitmentPostProfile;
const deleteRecruitmentPostProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const deletedRecruitmentPost = yield recruitmentPostService.deleteRecruitmentPost(id, req.userId);
        if (!deletedRecruitmentPost) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.RECRUITMENT_POST_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.RECRUITMENT_POST_DELETED,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteRecruitmentPostProfile = deleteRecruitmentPostProfile;
const getRecruitmentPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const recruitmentPost = yield recruitmentPostService.getRecruitmentPostById(id);
        if (recruitmentPost === null) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.RECRUITMENT_POST_NOT_FOUND,
            });
        }
        if (!recruitmentPost) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.RECRUITMENT_POST_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            recruitmentPost,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getRecruitmentPostById = getRecruitmentPostById;
const getAllRecruitmentPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const recruitmentPosts = yield recruitmentPostService.getAllRecruitmentPosts();
        if (recruitmentPosts.length === 0) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.RECRUITMENT_POST_NOT_FOUND,
            });
        }
        if (!recruitmentPosts) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.FAILED_TO_RETRIEVE_RECRUITMENT_POSTS,
            });
        }
        return res.status(200).json({
            success: true,
            recruitmentPosts,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllRecruitmentPosts = getAllRecruitmentPosts;
const updateRecruitmentPostStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: responseMessage_1.message.UNAUTHORIZED,
        });
    }
    console.log(req.userId);
    const userStatusUpdateData = Object.assign(Object.assign({}, req.body), { userUpdatedBy: req.userId, userUpdatedDate: new Date() });
    try {
        const recruitmentPost = yield recruitmentPostService.getRecruitmentPostById(id);
        if (!recruitmentPost) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.RECRUITMENT_POST_NOT_FOUND,
            });
        }
        const updatedRecruitmentPost = yield recruitmentPostService.updateRecruitmentPostStatus(id, userStatusUpdateData);
        if (!updatedRecruitmentPost) {
            return res.status(204).json({
                success: false,
                message: responseMessage_1.message.RECRUITMENT_POST_NOT_FOUND,
            });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.RECRUITMENT_POST_STATUS_UPDATED,
            recruitmentPost: updatedRecruitmentPost,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateRecruitmentPostStatus = updateRecruitmentPostStatus;
