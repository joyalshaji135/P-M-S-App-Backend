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
exports.updateTeamMemberStatusController = exports.getAllTeamMembersController = exports.getTeamMemberByIdController = exports.deleteTeamMemberController = exports.updateTeamMemberController = exports.createTeamMemberController = void 0;
const teamMemberServices = __importStar(require("./team-members.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const team_members_validation_1 = require("@validation/team-members/team-members.validation");
const response_1 = require("@src/helper/response");
const utils_1 = require("@src/helper/utils");
// Create Team Member
const createTeamMemberController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const lookupType = lookup_1.LookupTypes.TEAM_MEMBER;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const teamMemberData = Object.assign(Object.assign({ code }, req.body), { createdBy: req.userId });
        const { error } = (0, team_members_validation_1.teamMembersValidation)(req.body);
        if (error) {
            return next((0, response_1.respondError)((0, utils_1.getMessageFromValidationError)(error)));
        }
        const phoneExists = yield teamMemberServices.isPhoneNumberExists(teamMemberData.phone);
        if (phoneExists) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.PHONE_NUMBER_ALREADY_EXISTS,
            });
        }
        const createdTeamMember = yield teamMemberServices.createTeamMemberServices(teamMemberData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.TEAM_MEMBER_CREATED_SUCCESS,
            data: createdTeamMember,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.createTeamMemberController = createTeamMemberController;
// Update Team Member
const updateTeamMemberController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const teamMemberData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    // const { error } = teamMembersValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const existingTeamMember = yield teamMemberServices.getTeamMemberById(id);
        if (!existingTeamMember) {
            return res
                .status(400)
                .json({ success: false, message: responseMessage_1.message.TEAM_MEMBER_NOT_FOUND });
        }
        // const emailExists = await teamMemberServices.isEmailExists(
        //   teamMemberData.email,
        // );
        // if (emailExists) {
        //   return res.status(400).json({
        //     success: false,
        //     message: message.EMAIL_EXISTS,
        //   });
        // }
        const updatedTeamMember = yield teamMemberServices.editTeamMember(id, teamMemberData);
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TEAM_MEMBER_UPDATED_SUCCESS,
            teamMember: updatedTeamMember,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateTeamMemberController = updateTeamMemberController;
// Delete Team Member
const deleteTeamMemberController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const deletedTeamMember = yield teamMemberServices.deleteTeamMember(id, req.userId);
        if (!deletedTeamMember) {
            return res
                .status(204)
                .json({ success: false, message: responseMessage_1.message.TEAM_MEMBER_NOT_FOUND });
        }
        res
            .status(200)
            .json({ success: true, message: responseMessage_1.message.TEAM_MEMBER_DELETED });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteTeamMemberController = deleteTeamMemberController;
// Get Team Member by ID
const getTeamMemberByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const teamMember = yield teamMemberServices.getTeamMemberById(id);
        if (teamMember === null) {
            return res
                .status(400)
                .json({ success: false, message: responseMessage_1.message.TEAM_MEMBER_NOT_FOUND });
        }
        res.status(200).json({ success: true, teamMember });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getTeamMemberByIdController = getTeamMemberByIdController;
// Get All Team Members
const getAllTeamMembersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const teamMembers = yield teamMemberServices.getAllTeamMembers();
        if (!teamMembers.length) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TEAM_MEMBER_NOT_FOUND,
            });
        }
        res.status(200).json({ success: true, teamMembers });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.getAllTeamMembersController = getAllTeamMembersController;
// Update Team Member Status
const updateTeamMemberStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId) {
        return res.status(401).json({ message: responseMessage_1.message.UNAUTHORIZED });
    }
    const userModuleStatusUpdateData = Object.assign(Object.assign({}, req.body), { userUpdatedBy: req.userId, userUpdatedDate: new Date() });
    try {
        const existingTeamMember = yield teamMemberServices.getTeamMemberById(id);
        if (!existingTeamMember) {
            return res
                .status(400)
                .json({ success: false, message: responseMessage_1.message.TEAM_MEMBER_NOT_FOUND });
        }
        const updatedModule = yield teamMemberServices.updateTeamMemberStatus(id, userModuleStatusUpdateData);
        if (!updatedModule) {
            return res
                .status(404)
                .json({ success: false, message: responseMessage_1.message.TEAM_MEMBER_NOT_FOUND });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TEAM_MEMBER_STATUS_UPDATED,
            data: updatedModule,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateTeamMemberStatusController = updateTeamMemberStatusController;
