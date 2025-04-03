import logger from '@utils/logger';

import * as commonCountApiRepository from './common-count-api.repositors';

// Company Owner Count Functions
export const getAllCompanyOwnerCount = async (): Promise<number> => {
  try {
    const companyOwnerCount =
      await commonCountApiRepository.getCompanyOwnersCount();
    return companyOwnerCount;
  } catch (error) {
    throw new Error('Fail to get Company Owner Count');
  }
};

// Team Manager Count Functions
export const getAllTeamManagerCount = async (): Promise<number> => {
  try {
    const teamManagerCount =
      await commonCountApiRepository.getTeamManagersCount();
    return teamManagerCount;
  } catch (error) {
    throw new Error('Fail to get Team Manager Count');
  }
};

// Team Member Count Functions
export const getAllTeamMemberCount = async (): Promise<number> => {
  try {
    const teamMemberCount = await commonCountApiRepository.getTeamMemberCount();
    return teamMemberCount;
  } catch (error) {
    throw new Error('Fail to get Team Member Count');
  }
};

// Event Count Functions
export const getAllEventCount = async (): Promise<number> => {
  try {
    const eventCount = await commonCountApiRepository.getEventCount();
    return eventCount;
  } catch (error) {
    throw new Error('Fail to get Event Count');
  }
};

// Google Meet Count Functions
export const getAllGoogleMeetCount = async (): Promise<number> => {
  try {
    const googleMeetCount = await commonCountApiRepository.getGoogleMeetCount();
    return googleMeetCount;
  } catch (error) {
    throw new Error('Fail to get Google Meet Count');
  }
};

// Recruitment Count Functions
export const getAllRecruitmentCount = async (): Promise<number> => {
  try {
    const recruitmentCount = await commonCountApiRepository.RecruitmentCount();
    return recruitmentCount;
  } catch (error) {
    throw new Error('Fail to get Recruitment Count');
  }
};

// File Document Count Functions
export const getAllDocumentFileCount = async (): Promise<number> => {
  try {
    const documentFileCount =
      await commonCountApiRepository.documentFileCount();
    return documentFileCount;
  } catch (error) {
    throw new Error('Fail to get Document File Count');
  }
};

// getAllProjectCount
export const getAllProjectCount = async (): Promise<number> => {
  try {
    const projectCount = await commonCountApiRepository.getProjectCount();
    return projectCount;
  } catch (error) {
    throw new Error('Fail to get Project Count');
  }
};

// getAllTaskCount
export const getAllTaskCount = async (): Promise<number> => {
  try {
    const taskCount = await commonCountApiRepository.getTaskCount();
    return taskCount;
  } catch (error) {
    throw new Error('Fail to get Task Count');
  }
};

// getAllFeedbackCount
export const getAllFeedbackCount = async (): Promise<number> => {
  try {
    const feedbackCount = await commonCountApiRepository.getFeedbackCount();
    return feedbackCount;
  } catch (error) {
    throw new Error('Fail to get Feedback Count');
  }
};