import mongoose from "mongoose";
import taskRoleModels from "@src/models/master-workspace-modules-models/task-role.models";
import logger from "@src/utils/logger";

// taskAssignedClientServices : client id using assigned task listing

export const taskAssignedClientRepository = async (client_id: string) => {
    logger.info(`Getting Task Wise Client list with ID ${client_id}`);
    return taskRoleModels.find({ isDeleted: false, resourceName: client_id })
    .populate('resourceName', 'name email role phone')
    .populate('project', 'projectName industry description projectStatus')
    .populate('createdBy', 'name email')
    .populate('userUpdatedBy', 'name email')
    .exec();
};