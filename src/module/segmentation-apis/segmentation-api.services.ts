import logger from "@src/utils/logger";
import * as segmentationApiRepository from "./segmentation-api.repository";



// taskAssignedClientServices
export const taskAssignedClientServices = async (client_id: string) => {
    logger.info(`Getting Task Wise Client list with ID ${client_id}`);
    return segmentationApiRepository.taskAssignedClientRepository(client_id);
  };