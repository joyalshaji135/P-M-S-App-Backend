import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import * as documentRepository from './document-files.repositorys';
import { documentFileDocument } from '@models/feature-manage-modules-models/document-files.models';

export const createDocumentProfile = async (
  documentData: Partial<documentFileDocument>,
): Promise<documentFileDocument> => {
  try {
    logger.info('Creating a new document profile', { documentData });
    if (!documentData.name) {
      throw new Error('Document name is required.');
    }

    if (!documentData.nameAlias) {
      throw new Error('Document name alias is required.');
    }

    const existingDocumentByName = await documentRepository.isNameExists(
      documentData.name,
    );
    const existingDocumentByAlias = await documentRepository.isNameAliasExists(
      documentData.nameAlias,
    );

    if (existingDocumentByName) {
      throw new Error('A document with the same name already exists.');
    }

    if (existingDocumentByAlias) {
      throw new Error('A document with the same name alias already exists.');
    }

    const newDocumentProfile = await documentRepository.create(documentData);
    await Log.create({
      userId: newDocumentProfile.createdBy,
      module: 'document',
      action: 'create',
      actionId: newDocumentProfile._id,
      description: `Created a new document profile with name: ${newDocumentProfile.name}`,
    });

    return newDocumentProfile;
  } catch (error: any) {
    throw new Error(`Error creating document profile: ${error.message}`);
  }
};

export const editDocumentProfile = async (
  documentId: string,
  documentData: Partial<documentFileDocument>,
): Promise<documentFileDocument | null> => {
  try {
    logger.info(`Editing document profile with ID ${documentId}`, {
      documentData,
    });
    if (documentData.name) {
      const existingDocument = await documentRepository.isNameExists(
        documentData.name,
        documentId,
      );
      if (existingDocument) {
        throw new Error('A document with the same name already exists.');
      }
    }

    if (documentData.nameAlias) {
      const existingDocument = await documentRepository.isNameAliasExists(
        documentData.nameAlias,
        documentId,
      );
      if (existingDocument) {
        throw new Error('A document with the same name alias already exists.');
      }
    }

    const updatedDocumentProfile = await documentRepository.updateById(
      documentId,
      documentData,
    );

    if (!updatedDocumentProfile) {
      throw new Error(`Document profile with ID ${documentId} not found`);
    }

    await Log.create({
      userId: updatedDocumentProfile.userUpdatedBy,
      module: 'document',
      action: 'edit',
      actionId: updatedDocumentProfile._id,
      description: `Updated document profile with ID ${documentId}`,
    });

    return updatedDocumentProfile;
  } catch (error: any) {
    throw new Error(`Error updating document profile: ${error.message}`);
  }
};

export const getAllDocuments = async () => {
  logger.info('Getting all documents');
  return documentRepository.getAllDocumentFiles();
};

export const getDocumentById = async (id: string) => {
  logger.info(`Getting document with ID ${id}`);
  return documentRepository.findById(id);
};

export const deleteDocument = async (
  documentId: string,
  deletedBy: mongoose.Types.ObjectId,
) => {
  try {
    logger.info(`Deleting document with ID ${documentId} by user ${deletedBy}`);

    const deletedDocument = await documentRepository.deleteDocumentFile(
      documentId,
      deletedBy,
    );

    if (!deletedDocument) {
      throw new Error(`Document profile with ID ${documentId} not found`);
    }
    return deletedDocument;
  } catch (error: any) {
    throw new Error(`Error deleting document profile: ${error.message}`);
  }
};

export const updateDocumentStatus = async (
  id: string,
  updatedData: Partial<documentFileDocument>,
): Promise<documentFileDocument | null> => {
  try {
    logger.info(
      `Updating status for document with ID ${id} to ${updatedData.status} by user ${updatedData.userUpdatedBy}`,
    );

    const updatedStatus = await documentRepository.changeDocumentFileStatus(
      id,
      updatedData,
    );

    if (!updatedStatus) {
      throw new Error(`Document profile with ID ${id} not found`);
    }

    await Log.create({
      userId: updatedData.userUpdatedBy,
      module: 'document',
      action: 'update_status',
      actionId: updatedStatus._id,
      description: `Updated status for document profile with ID ${id} to ${updatedData.status}`,
    });

    return updatedStatus;
  } catch (error: any) {
    throw new Error(`Error updating document profile status: ${error.message}`);
  }
};
