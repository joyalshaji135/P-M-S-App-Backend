// import this Models
import customerModel from '@src/models/master-manage-modules-models/customer.models';

import eventProgramsModels from '@src/models/feature-manage-modules-models/event-programs.models';

import googleMeetsModels from '@src/models/feature-manage-modules-models/google-meets.models';

import recruitmentPostsModels from '@src/models/feature-manage-modules-models/recruitment-posts.models';

import documentFileModel from '@src/models/feature-manage-modules-models/document-files.models';

// Company Owner Count Functions
export const getCompanyOwnersCount = async (): Promise<number> => {
  return customerModel.countDocuments({
    isDeleted: false,
    role: 'company-owners', // Add role filter
  });
};

// Team Manager Count Functions
export const getTeamManagersCount = async (): Promise<number> => {
  return customerModel.countDocuments({
    role: 'team-managers',
    isDeleted: false,
  });
};

// Team Member Count Functions
export const getTeamMemberCount = async (): Promise<number> => {
  return customerModel.countDocuments({
    role: 'team-members',
    isDeleted: false,
  });
};

// Event Count Functions
export const getEventCount = async (): Promise<number> => {
  return eventProgramsModels.countDocuments({
    isDeleted: false,
  });
};

// Google Meet Count Functions
export const getGoogleMeetCount = async (): Promise<number> => {
  return googleMeetsModels.countDocuments({
    isDeleted: false,
  });
};

// Recruitment Count Functions
export const RecruitmentCount = async (): Promise<number> => {
  return recruitmentPostsModels.countDocuments({
    isDeleted: false,
  });
};

// File Document Count Functions
export const documentFileCount = async (): Promise<number> => {
  return documentFileModel.countDocuments({
    isDeleted: false,
  });
};
