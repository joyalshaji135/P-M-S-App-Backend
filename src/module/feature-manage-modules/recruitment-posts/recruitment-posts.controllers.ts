import { NextFunction, Response } from 'express';
import * as recruitmentPostService from './recruitment-posts.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { recruitmentPostValidation } from '@validation/recruitment-posts/recruitment-posts.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';

export const createRecruitmentPostProfile = async (
  req: RequestWithAuthData,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    const name = req.body.name;
    const nameAlias = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
    const lookupType = LookupTypes.RECRUITMENT_POST;
    const code = await generateNewLookupCode(lookupType);

    const recruitmentPostData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };
    // Add Validation for RecruitmentPost
    // const { error } = recruitmentPostValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    const createdRecruitmentPost =
      await recruitmentPostService.createRecruitmentPost(recruitmentPostData);

    return res.status(201).json({
      success: true,
      message: message.RECRUITMENT_POST_CREATED_SUCCESS,
      recruitmentPost: createdRecruitmentPost,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editRecruitmentPostProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const recruitmentPostData = {
    ...req.body,
    userUpdatedDate: new Date(),
    userUpdatedBy: req.userId,
  };

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    // Get RecruitmentPost By Id from the database
    const recruitmentPost = await recruitmentPostService.getRecruitmentPostById(id);

    if (!recruitmentPost) {
      return res.status(400).json({
        success: false,
        message: message.RECRUITMENT_POST_NOT_FOUND,
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

    const existingRecruitmentPost =
      await recruitmentPostService.getRecruitmentPostById(id);
    if (!existingRecruitmentPost) {
      return res.status(204).json({
        success: false,
        message: message.RECRUITMENT_POST_NOT_FOUND,
      });
    }

    const updatedRecruitmentPost =
      await recruitmentPostService.editRecruitmentPost(id, recruitmentPostData);

    if (!updatedRecruitmentPost) {
      return res.status(204).json({
        success: false,
        message: message.RECRUITMENT_POST_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.RECRUITMENT_POST_UPDATED_SUCCESS,
      recruitmentPost: updatedRecruitmentPost,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRecruitmentPostProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const deletedRecruitmentPost = await recruitmentPostService.deleteRecruitmentPost(
      id,
      req.userId,
    );

    if (!deletedRecruitmentPost) {
      return res.status(204).json({
        success: false,
        message: message.RECRUITMENT_POST_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.RECRUITMENT_POST_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getRecruitmentPostById = async (
    req: RequestWithAuthData,
    res: Response,
  ): Promise<any> => {
    const { id } = req.params;
  
    try {
      if (!req.userId) {
        return res.status(401).json({
          success: false,
          message: message.UNAUTHORIZED,
        });
      }
  
      const recruitmentPost = await recruitmentPostService.getRecruitmentPostById(id);
  
      if (recruitmentPost === null) {
        return res.status(400).json({
          success: false,
          message: message.RECRUITMENT_POST_NOT_FOUND,
        });
      }
  
      if (!recruitmentPost) {
        return res.status(204).json({
          success: false,
          message: message.RECRUITMENT_POST_NOT_FOUND,
        });
      }
  
      return res.status(200).json({
        success: true,
        recruitmentPost,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const getAllRecruitmentPosts = async (
    req: RequestWithAuthData,
    res: Response,
  ): Promise<any> => {
    try {
      if (!req.userId) {
        return res.status(401).json({
          success: false,
          message: message.UNAUTHORIZED,
        });
      }
  
      const recruitmentPosts = await recruitmentPostService.getAllRecruitmentPosts();
  
      if (recruitmentPosts.length === 0) {
        return res.status(400).json({
          success: false,
          message: message.RECRUITMENT_POST_NOT_FOUND,
        });
      }
  
      if (!recruitmentPosts) {
        return res.status(204).json({
          success: false,
          message: message.FAILED_TO_RETRIEVE_RECRUITMENT_POSTS,
        });
      }
  
      return res.status(200).json({
        success: true,
        recruitmentPosts,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const updateRecruitmentPostStatus = async (
    req: RequestWithAuthData,
    res: Response,
  ): Promise<any> => {
    const { id } = req.params;
  
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }
    console.log(req.userId);
    const userStatusUpdateData = {
      ...req.body,
      userUpdatedBy: req.userId,
      userUpdatedDate: new Date(),
    };
    try {
      const recruitmentPost = await recruitmentPostService.getRecruitmentPostById(id);
  
      if (!recruitmentPost) {
        return res.status(400).json({
          success: false,
          message: message.RECRUITMENT_POST_NOT_FOUND,
        });
      }
      const updatedRecruitmentPost =
        await recruitmentPostService.updateRecruitmentPostStatus(
          id,
          userStatusUpdateData,
        );
  
      if (!updatedRecruitmentPost) {
        return res.status(204).json({
          success: false,
          message: message.RECRUITMENT_POST_NOT_FOUND,
        });
      }
  
      return res.status(200).json({
        success: true,
        message: message.RECRUITMENT_POST_STATUS_UPDATED,
        recruitmentPost: updatedRecruitmentPost,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };