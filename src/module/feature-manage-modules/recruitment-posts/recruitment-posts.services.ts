import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as recruitmentPostRepository from './recruitment-posts.repositorys';
import { recruitmentPostDocument } from '@models/feature-manage-modules-models/recruitment-posts.models';

export const createRecruitmentPost = async (
  recruitmentPostData: Partial<recruitmentPostDocument>,
): Promise<recruitmentPostDocument> => {
  try {
    logger.info('Creating a new recruitment post', { recruitmentPostData });
    if (!recruitmentPostData.name) {
      throw new Error('Recruitment post name is required.');
    }

    if (!recruitmentPostData.nameAlias) {
      throw new Error('Recruitment post name alias is required.');
    }

    const existingRecruitmentPostByName =
      await recruitmentPostRepository.isNameExists(recruitmentPostData.name);
    const existingRecruitmentPostByAlias =
      await recruitmentPostRepository.isNameAliasExists(
        recruitmentPostData.nameAlias,
      );

    if (existingRecruitmentPostByName) {
      throw new Error('A recruitment post with the same name already exists.');
    }

    if (existingRecruitmentPostByAlias) {
      throw new Error(
        'A recruitment post with the same name alias already exists.',
      );
    }

    const newRecruitmentPost =
      await recruitmentPostRepository.create(recruitmentPostData);
    await Log.create({
      userId: newRecruitmentPost.createdBy,
      module: 'recruitmentPost',
      action: 'create',
      actionId: newRecruitmentPost._id,
      description: `Created a new recruitment post with name: ${newRecruitmentPost.name}`,
    });

    return newRecruitmentPost;
  } catch (error: any) {
    throw new Error(`Error creating recruitment post: ${error.message}`);
  }
};

export const editRecruitmentPost = async (
  recruitmentPostId: string,
  recruitmentPostData: Partial<recruitmentPostDocument>,
): Promise<recruitmentPostDocument | null> => {
  try {
    logger.info(`Editing recruitment post with ID ${recruitmentPostId}`, {
      recruitmentPostData,
    });
    if (recruitmentPostData.name) {
      const existingRecruitmentPost = await recruitmentPostRepository.isNameExists(
        recruitmentPostData.name,
        recruitmentPostId,
      );
      if (existingRecruitmentPost) {
        throw new Error('A recruitment post with the same name already exists.');
      }
    }

    if (recruitmentPostData.nameAlias) {
      const existingRecruitmentPost =
        await recruitmentPostRepository.isNameAliasExists(
          recruitmentPostData.nameAlias,
          recruitmentPostId,
        );
      if (existingRecruitmentPost) {
        throw new Error(
          'A recruitment post with the same name alias already exists.',
        );
      }
    }

    const updatedRecruitmentPost = await recruitmentPostRepository.updateById(
      recruitmentPostId,
      recruitmentPostData,
    );

    if (!updatedRecruitmentPost) {
      throw new Error(
        `Recruitment post with ID ${recruitmentPostId} not found`,
      );
    }

    await Log.create({
      userId: updatedRecruitmentPost.userUpdatedBy,
      module: 'recruitmentPost',
      action: 'edit',
      actionId: updatedRecruitmentPost._id,
      description: `Updated recruitment post with ID ${recruitmentPostId}`,
    });

    return updatedRecruitmentPost;
  } catch (error: any) {
    throw new Error(`Error updating recruitment post: ${error.message}`);
  }
};

export const getAllRecruitmentPosts = async () => {
  logger.info('Getting all recruitment posts');
  return recruitmentPostRepository.getAllRecruitmentPosts();
};

export const getRecruitmentPostById = async (id: string) => {
  logger.info(`Getting recruitment post with ID ${id}`);
  return recruitmentPostRepository.findById(id);
};

export const deleteRecruitmentPost = async (
  recruitmentPostId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(
      `Deleting recruitment post with ID ${recruitmentPostId} by user ${deletedBy}`,
    );

    const deletedRecruitmentPost = await recruitmentPostRepository.deleteRecruitmentPost(
      recruitmentPostId,
      deletedBy,
    );

    if (!deletedRecruitmentPost) {
      throw new Error(
        `Recruitment post with ID ${recruitmentPostId} not found`,
      );
    }
    return deletedRecruitmentPost;
  } catch (error: any) {
    throw new Error(`Error deleting recruitment post: ${error.message}`);
  }
};

export const updateRecruitmentPostStatus = async (
  id: string,
  updatedData: Partial<recruitmentPostDocument>,
): Promise<recruitmentPostDocument | null> => {
  try {
    logger.info(
      `Updating status for recruitment post with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await recruitmentPostRepository.changeRecruitmentPostStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Recruitment post with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'recruitmentPost',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for recruitment post with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(
      `Error updating recruitment post status: ${error.message}`,
    );
  }
};