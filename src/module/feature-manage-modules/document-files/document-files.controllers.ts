import { NextFunction, Response } from 'express';
import * as documentFileService from './document-files.services';
import { message } from '@constants/responseMessage';
import { RequestWithAuthData } from '../../../@types/express';
import { LookupTypes } from '@constants/lookup';
import { generateNewLookupCode } from '@utils/lookupCodeGenerator';
// import { documentFileValidation } from '@validation/document-files/document-files.validation';
import { respondError } from '@helper/response';
import { getMessageFromValidationError } from '@helper/utils';

export const createDocumentFileProfile = async (
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
    const lookupType = LookupTypes.DOCUMENT_FILE;
    const code = await generateNewLookupCode(lookupType);

    const documentFileData = {
      code,
      nameAlias,
      ...req.body,
      createdBy: req.userId,
    };
    // Add Validation for DocumentFile
    // const { error } = documentFileValidation(req.body);
    // if (error) {
    //   return next(respondError(getMessageFromValidationError(error)));
    // }

    const createdDocumentFile =
      await documentFileService.createDocumentProfile(documentFileData);

    return res.status(201).json({
      success: true,
      message: message.DOCUMENT_FILE_CREATED_SUCCESS,
      documentFile: createdDocumentFile,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editDocumentFileProfile = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  const documentFileData = {
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
    // Get DocumentFile By Id from the database
    const documentFile = await documentFileService.getDocumentById(id);

    if (!documentFile) {
      return res.status(400).json({
        success: false,
        message: message.DOCUMENT_FILE_NOT_FOUND,
      });
    }
    if (req.body.name) {
      const name = req.body.name;
      const nameAlias = name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\./g, '');
      documentFileData.nameAlias = nameAlias;
    }

    const existingDocumentFile =
      await documentFileService.getDocumentById(id);
    if (!existingDocumentFile) {
      return res.status(204).json({
        success: false,
        message: message.DOCUMENT_FILE_NOT_FOUND,
      });
    }

    const updatedDocumentFile =
      await documentFileService.editDocumentProfile(id, documentFileData);

    if (!updatedDocumentFile) {
      return res.status(204).json({
        success: false,
        message: message.DOCUMENT_FILE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.DOCUMENT_FILE_UPDATED_SUCCESS,
      documentFile: updatedDocumentFile,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDocumentFileProfile = async (
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

    const deletedDocumentFile = await documentFileService.deleteDocument(
      id,
      req.userId,
    );

    if (!deletedDocumentFile) {
      return res.status(204).json({
        success: false,
        message: message.DOCUMENT_FILE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.DOCUMENT_FILE_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getDocumentFileById = async (
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
  
      const documentFile = await documentFileService.getDocumentById(id);
  
      if (documentFile === null) {
        return res.status(400).json({
          success: false,
          message: message.DOCUMENT_FILE_NOT_FOUND,
        });
      }
  
      if (!documentFile) {
        return res.status(204).json({
          success: false,
          message: message.DOCUMENT_FILE_NOT_FOUND,
        });
      }
  
      return res.status(200).json({
        success: true,
        documentFile,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const getAllDocumentFiles = async (
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
  
      const documentFiles = await documentFileService.getAllDocuments();
  
      if (documentFiles.length === 0) {
        return res.status(400).json({
          success: false,
          message: message.DOCUMENT_FILE_NOT_FOUND,
        });
      }
  
      if (!documentFiles) {
        return res.status(204).json({
          success: false,
          message: message.FAILED_TO_RETRIEVE_DOCUMENT_FILES,
        });
      }
  
      return res.status(200).json({
        success: true,
        documentFiles,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const updateDocumentFileStatus = async (
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
      const documentFile = await documentFileService.getDocumentById(id);
  
      if (!documentFile) {
        return res.status(400).json({
          success: false,
          message: message.DOCUMENT_FILE_NOT_FOUND,
        });
      }
      const updatedDocumentFile =
        await documentFileService.updateDocumentStatus(
          id,
          userStatusUpdateData,
        );
  
      if (!updatedDocumentFile) {
        return res.status(204).json({
          success: false,
          message: message.DOCUMENT_FILE_NOT_FOUND,
        });
      }
  
      return res.status(200).json({
        success: true,
        message: message.DOCUMENT_FILE_STATUS_UPDATED,
        documentFile: updatedDocumentFile,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  