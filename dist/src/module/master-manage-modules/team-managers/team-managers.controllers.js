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
exports.updateTeamManagerStatusController = exports.getAllTeamManagersController = exports.getTeamManagerByIdController = exports.deleteTeamManagerController = exports.updateTeamManagerController = exports.createTeamManagerController = void 0;
const teamManagerServices = __importStar(require("./team-managers.services"));
const responseMessage_1 = require("@constants/responseMessage");
const lookup_1 = require("@constants/lookup");
const lookupCodeGenerator_1 = require("@utils/lookupCodeGenerator");
const team_managers_validation_1 = require("@validation/team-managers/team-managers.validation");
const response_1 = require("@src/helper/response");
const utils_1 = require("@src/helper/utils");
// Create Team Manager
const createTeamManagerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: responseMessage_1.message.UNAUTHORIZED,
            });
        }
        const lookupType = lookup_1.LookupTypes.TEAM_MANAGER;
        const code = yield (0, lookupCodeGenerator_1.generateNewLookupCode)(lookupType);
        const teamManagerData = Object.assign(Object.assign({ code }, req.body), { createdBy: req.userId });
        const { error } = (0, team_managers_validation_1.teamManagersValidation)(req.body);
        if (error) {
            return next((0, response_1.respondError)((0, utils_1.getMessageFromValidationError)(error)));
        }
        const phoneExists = yield teamManagerServices.isPhoneNumberExists(teamManagerData.phone);
        if (phoneExists) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.PHONE_NUMBER_ALREADY_EXISTS,
            });
        }
        const createdTeamManager = yield teamManagerServices.createTeamManagerServices(teamManagerData);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.TEAM_MANAGER_CREATED_SUCCESS,
            data: createdTeamManager,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
exports.createTeamManagerController = createTeamManagerController;
// Update Team Manager
const updateTeamManagerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const teamManagerData = Object.assign(Object.assign({}, req.body), { userUpdatedDate: new Date(), userUpdatedBy: req.userId });
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const existingTeamManager = yield teamManagerServices.getTeamManagerById(id);
        // 400 bad request
        if (!existingTeamManager) {
            return res
                .status(400)
                .json({ success: false, message: responseMessage_1.message.TEAM_MANAGER_NOT_FOUND });
        }
        // const emailExists = await teamManagerServices.isEmailExists(
        //   teamManagerData.email,
        // );
        // if (emailExists) {
        //   return res.status(400).json({
        //     success: false,
        //     message: message.EMAIL_EXISTS,
        //   });
        // }
        if (!existingTeamManager) {
            return res
                .status(204)
                .json({ success: false, message: responseMessage_1.message.TEAM_MANAGER_NOT_FOUND });
        }
        const updatedTeamManager = yield teamManagerServices.editTeamManager(id, teamManagerData);
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TEAM_MANAGER_UPDATED_SUCCESS,
            teamManager: updatedTeamManager,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateTeamManagerController = updateTeamManagerController;
// Delete Team Manager
const deleteTeamManagerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const deletedTeamManager = yield teamManagerServices.deleteTeamManager(id, req.userId);
        if (!deletedTeamManager) {
            return res
                .status(204)
                .json({ success: false, message: responseMessage_1.message.TEAM_MANAGER_NOT_FOUND });
        }
        res
            .status(200)
            .json({ success: true, message: responseMessage_1.message.TEAM_MANAGER_DELETED });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteTeamManagerController = deleteTeamManagerController;
// Get Team Manager by ID
const getTeamManagerByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const teamManager = yield teamManagerServices.getTeamManagerById(id);
        if (teamManager === null) {
            return res
                .status(400)
                .json({ success: false, message: responseMessage_1.message.TEAM_MANAGER_NOT_FOUND });
        }
        if (!teamManager) {
            return res
                .status(204)
                .json({ success: false, message: responseMessage_1.message.TEAM_MANAGER_NOT_FOUND });
        }
        res.status(200).json({ success: true, teamManager });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getTeamManagerByIdController = getTeamManagerByIdController;
// Get All Team Managers
const getAllTeamManagersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res
                .status(401)
                .json({ success: false, message: responseMessage_1.message.UNAUTHORIZED });
        }
        const teamManagers = yield teamManagerServices.getAllTeamManagers();
        if (!teamManagers.length) {
            return res.status(400).json({
                success: false,
                message: responseMessage_1.message.TEAM_MANAGER_NOT_FOUND,
            });
        }
        res.status(200).json({ success: true, teamManagers });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.getAllTeamManagersController = getAllTeamManagersController;
// Update Team Manager Status
const updateTeamManagerStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId) {
        return res.status(401).json({ message: responseMessage_1.message.UNAUTHORIZED });
    }
    const userModuleStatusUpdateData = Object.assign(Object.assign({}, req.body), { userUpdatedBy: req.userId, userUpdatedDate: new Date() });
    try {
        const existingTeamManager = yield teamManagerServices.getTeamManagerById(id);
        // 400 bad request
        if (!existingTeamManager) {
            return res
                .status(400)
                .json({ success: false, message: responseMessage_1.message.TEAM_MANAGER_NOT_FOUND });
        }
        const updatedModule = yield teamManagerServices.updateTeamManagerStatus(id, userModuleStatusUpdateData);
        if (!updatedModule) {
            return res
                .status(404)
                .json({ success: false, message: responseMessage_1.message.TEAM_MANAGER_NOT_FOUND });
        }
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.TEAM_MANAGER_STATUS_UPDATED,
            data: updatedModule,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateTeamManagerStatusController = updateTeamManagerStatusController;
