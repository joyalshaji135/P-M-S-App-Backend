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
exports.updateRecruitmentPostStatus = exports.deleteRecruitmentPost = exports.getRecruitmentPostById = exports.getAllRecruitmentPosts = exports.editRecruitmentPost = exports.createRecruitmentPost = void 0;
const logger_1 = __importDefault(require("@utils/logger"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const recruitmentPostRepository = __importStar(require("./recruitment-posts.repositorys"));
const createRecruitmentPost = (recruitmentPostData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Creating a new recruitment post', { recruitmentPostData });
        if (!recruitmentPostData.name) {
            throw new Error('Recruitment post name is required.');
        }
        if (!recruitmentPostData.nameAlias) {
            throw new Error('Recruitment post name alias is required.');
        }
        const existingRecruitmentPostByName = yield recruitmentPostRepository.isNameExists(recruitmentPostData.name);
        const existingRecruitmentPostByAlias = yield recruitmentPostRepository.isNameAliasExists(recruitmentPostData.nameAlias);
        if (existingRecruitmentPostByName) {
            throw new Error('A recruitment post with the same name already exists.');
        }
        if (existingRecruitmentPostByAlias) {
            throw new Error('A recruitment post with the same name alias already exists.');
        }
        const newRecruitmentPost = yield recruitmentPostRepository.create(recruitmentPostData);
        yield log_model_1.default.create({
            userId: newRecruitmentPost.createdBy,
            module: 'recruitmentPost',
            action: 'create',
            actionId: newRecruitmentPost._id,
            description: `Created a new recruitment post with name: ${newRecruitmentPost.name}`,
        });
        return newRecruitmentPost;
    }
    catch (error) {
        throw new Error(`Error creating recruitment post: ${error.message}`);
    }
});
exports.createRecruitmentPost = createRecruitmentPost;
const editRecruitmentPost = (recruitmentPostId, recruitmentPostData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing recruitment post with ID ${recruitmentPostId}`, {
            recruitmentPostData,
        });
        if (recruitmentPostData.name) {
            const existingRecruitmentPost = yield recruitmentPostRepository.isNameExists(recruitmentPostData.name, recruitmentPostId);
            if (existingRecruitmentPost) {
                throw new Error('A recruitment post with the same name already exists.');
            }
        }
        if (recruitmentPostData.nameAlias) {
            const existingRecruitmentPost = yield recruitmentPostRepository.isNameAliasExists(recruitmentPostData.nameAlias, recruitmentPostId);
            if (existingRecruitmentPost) {
                throw new Error('A recruitment post with the same name alias already exists.');
            }
        }
        const updatedRecruitmentPost = yield recruitmentPostRepository.updateById(recruitmentPostId, recruitmentPostData);
        if (!updatedRecruitmentPost) {
            throw new Error(`Recruitment post with ID ${recruitmentPostId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedRecruitmentPost.userUpdatedBy,
            module: 'recruitmentPost',
            action: 'edit',
            actionId: updatedRecruitmentPost._id,
            description: `Updated recruitment post with ID ${recruitmentPostId}`,
        });
        return updatedRecruitmentPost;
    }
    catch (error) {
        throw new Error(`Error updating recruitment post: ${error.message}`);
    }
});
exports.editRecruitmentPost = editRecruitmentPost;
const getAllRecruitmentPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Getting all recruitment posts');
    return recruitmentPostRepository.getAllRecruitmentPosts();
});
exports.getAllRecruitmentPosts = getAllRecruitmentPosts;
const getRecruitmentPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Getting recruitment post with ID ${id}`);
    return recruitmentPostRepository.findById(id);
});
exports.getRecruitmentPostById = getRecruitmentPostById;
const deleteRecruitmentPost = (recruitmentPostId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Deleting recruitment post with ID ${recruitmentPostId} by user ${deletedBy}`);
        const deletedRecruitmentPost = yield recruitmentPostRepository.deleteRecruitmentPost(recruitmentPostId, deletedBy);
        if (!deletedRecruitmentPost) {
            throw new Error(`Recruitment post with ID ${recruitmentPostId} not found`);
        }
        return deletedRecruitmentPost;
    }
    catch (error) {
        throw new Error(`Error deleting recruitment post: ${error.message}`);
    }
});
exports.deleteRecruitmentPost = deleteRecruitmentPost;
const updateRecruitmentPostStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for recruitment post with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield recruitmentPostRepository.changeRecruitmentPostStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Recruitment post with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedData.userUpdatedBy,
            module: 'recruitmentPost',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated status for recruitment post with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating recruitment post status: ${error.message}`);
    }
});
exports.updateRecruitmentPostStatus = updateRecruitmentPostStatus;
