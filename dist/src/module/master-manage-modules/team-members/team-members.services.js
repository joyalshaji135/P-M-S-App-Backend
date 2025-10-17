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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamMemberStatus = exports.getAllTeamMembers = exports.getTeamMemberById = exports.deleteTeamMember = exports.editTeamMember = exports.isTeamMemberNameExists = exports.isEmailExists = exports.isPhoneNumberExists = exports.createTeamMemberServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("@utils/logger"));
const teamMemberRepository = __importStar(require("./team-members.repository"));
const responseMessage_1 = require("@constants/responseMessage");
const bcrypt_1 = __importDefault(require("bcrypt"));
const log_model_1 = __importDefault(require("@models/lookups-models/log.model"));
const createTeamMemberServices = (teamMemberData) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Creating team member: ${teamMemberData.email}`);
    const { password = '12345', email } = teamMemberData, otherTeamMemberData = __rest(teamMemberData, ["password", "email"]);
    if (!password) {
        throw new Error(responseMessage_1.message.PASSWORD_REQUIRED);
    }
    if (!email) {
        throw new Error(responseMessage_1.message.EMAIL_REQUIRED);
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newTeamMember = Object.assign(Object.assign({}, otherTeamMemberData), { password: hashedPassword, email });
    const existingTeamMember = yield teamMemberRepository.findByEmail(email);
    if (existingTeamMember) {
        throw new Error(responseMessage_1.message.TEAM_MEMBER_EXISTS);
    }
    const createdTeamMember = yield teamMemberRepository.createTeamMemberRepository(newTeamMember);
    yield log_model_1.default.create({
        userId: createdTeamMember.createdBy,
        module: 'teamMember',
        action: 'create',
        actionId: createdTeamMember._id,
        description: `Created a new team member with name: ${createdTeamMember.name}`,
    });
    return createdTeamMember;
});
exports.createTeamMemberServices = createTeamMemberServices;
const isPhoneNumberExists = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teamMemberRepository.isPhoneNumberExists(phone);
});
exports.isPhoneNumberExists = isPhoneNumberExists;
const isEmailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teamMemberRepository.isEmailExists(email);
});
exports.isEmailExists = isEmailExists;
const isTeamMemberNameExists = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teamMemberRepository.isTeamMemberNameExists(name);
});
exports.isTeamMemberNameExists = isTeamMemberNameExists;
const editTeamMember = (teamMemberId, teamMemberData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Editing team member with ID ${teamMemberId}`, {
            teamMemberData,
        });
        if (teamMemberData.name) {
            const existingTeamMember = yield teamMemberRepository.isNameExists(teamMemberData.name, teamMemberId);
            if (existingTeamMember) {
                throw new Error('A team member with the same name already exists.');
            }
        }
        const updatedTeamMember = yield teamMemberRepository.updateTeamMember(teamMemberId, teamMemberData);
        if (!updatedTeamMember) {
            throw new Error(`Team member with ID ${teamMemberId} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedTeamMember.userUpdatedBy,
            module: 'teamMember',
            action: 'edit',
            actionId: updatedTeamMember._id,
            description: `Updating team member account`,
        });
        return updatedTeamMember;
    }
    catch (error) {
        throw new Error(`Error updating team member: ${error.message}`);
    }
});
exports.editTeamMember = editTeamMember;
const deleteTeamMember = (teamMemberId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedById = new mongoose_1.default.Types.ObjectId(deletedBy);
        logger_1.default.info(`Deleting team member with ID ${teamMemberId} by user ${deletedById}`);
        const deletedTeamMember = yield teamMemberRepository.deleteTeamMember(teamMemberId, deletedById);
        if (!deletedTeamMember) {
            throw new Error(`Team member with ID ${teamMemberId} not found`);
        }
        yield log_model_1.default.create({
            userId: deletedTeamMember.deletedBy,
            module: 'teamMember',
            action: 'delete',
            actionId: deletedTeamMember._id,
            description: `Deleting team member`,
        });
        return deletedTeamMember;
    }
    catch (error) {
        throw new Error(`Error deleting team member: ${error.message}`);
    }
});
exports.deleteTeamMember = deleteTeamMember;
const getTeamMemberById = (teamMemberId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Fetching team member with ID ${teamMemberId}`);
        const teamMember = yield teamMemberRepository.findTeamMemberById(teamMemberId);
        return teamMember;
    }
    catch (error) {
        throw new Error(`Error fetching team member: ${error.message}`);
    }
});
exports.getTeamMemberById = getTeamMemberById;
const getAllTeamMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Fetching all team members');
        return yield teamMemberRepository.getAllTeamMembers();
    }
    catch (error) {
        throw new Error(`Error fetching team members: ${error.message}`);
    }
});
exports.getAllTeamMembers = getAllTeamMembers;
const updateTeamMemberStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`Updating status for team member with ID ${id} to ${updatedData.userUpdatedBy}`);
        const updatedStatus = yield teamMemberRepository.changeTeamMemberStatus(id, updatedData);
        if (!updatedStatus) {
            throw new Error(`Team member with ID ${id} not found`);
        }
        yield log_model_1.default.create({
            userId: updatedStatus.userUpdatedBy,
            module: 'teamMember',
            action: 'update_status',
            actionId: updatedStatus._id,
            description: `Updated the status for team member with ID ${id} to ${updatedData.status}`,
        });
        return updatedStatus;
    }
    catch (error) {
        throw new Error(`Error updating team member status: ${error.message}`);
    }
});
exports.updateTeamMemberStatus = updateTeamMemberStatus;
