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
exports.changeTeamMemberStatus = exports.getAllTeamMembers = exports.deleteTeamMember = exports.updateTeamMember = exports.findTeamMemberById = exports.isEmailExists = exports.isNameExists = exports.isTeamMemberNameExists = exports.isPhoneNumberExists = exports.findByEmail = exports.createTeamMemberRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customer_models_1 = __importDefault(require("@models/master-manage-modules-models/customer.models"));
const createTeamMemberRepository = (teamMemberData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new customer_models_1.default(teamMemberData);
    return yield user.save();
});
exports.createTeamMemberRepository = createTeamMemberRepository;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findOne({ email, role: 'team-member' }).exec();
});
exports.findByEmail = findByEmail;
const isPhoneNumberExists = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findOne({ phone, role: 'team-members' }).exec();
});
exports.isPhoneNumberExists = isPhoneNumberExists;
// Team Member Name is Existing
const isTeamMemberNameExists = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findOne({ name, role: 'team-members' }).exec();
});
exports.isTeamMemberNameExists = isTeamMemberNameExists;
const isNameExists = (name, idToExclude) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        name: name,
        isDeleted: false,
    };
    if (idToExclude) {
        filter._id = { $ne: new mongoose_1.default.Types.ObjectId(idToExclude) };
    }
    return yield customer_models_1.default.findOne(filter).exec();
});
exports.isNameExists = isNameExists;
const isEmailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findOne({ email }).exec();
});
exports.isEmailExists = isEmailExists;
const findTeamMemberById = (teamMemberId) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default
        .findById(teamMemberId)
        .where({ isDeleted: false })
        .populate('createdBy', 'name email')
        .populate('userUpdatedBy', 'name email')
        .populate('deletedBy', 'name email')
        .exec();
});
exports.findTeamMemberById = findTeamMemberById;
const updateTeamMember = (teamMemberId, teamMemberData) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findByIdAndUpdate(teamMemberId, { $set: teamMemberData }, { new: true, runValidators: true });
});
exports.updateTeamMember = updateTeamMember;
const deleteTeamMember = (teamMemberId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findByIdAndUpdate(teamMemberId, {
        $set: {
            isDeleted: true,
            deletedBy,
            deletedAt: new Date(),
        },
    }, { new: true });
});
exports.deleteTeamMember = deleteTeamMember;
const getAllTeamMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default
        .find({ isDeleted: false, role: 'team-members' }) // Make sure 'team-members' matches your system role
        .sort({ createdAt: -1 });
});
exports.getAllTeamMembers = getAllTeamMembers;
const changeTeamMemberStatus = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return customer_models_1.default.findByIdAndUpdate(id, {
        $set: {
            status: updatedData.status,
            userUpdatedBy: updatedData.userUpdatedBy,
            userUpdatedDate: updatedData.userUpdatedDate,
        },
    }, { new: true, runValidators: true });
});
exports.changeTeamMemberStatus = changeTeamMemberStatus;
