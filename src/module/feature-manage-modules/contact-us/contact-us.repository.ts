import mongoose from 'mongoose';
import logger from '@utils/logger';
import contactUsModel, {
  contactUsDocument,
} from '@src/models/feature-manage-modules-models/contact-us.model';

// createContactUs
export const createContactUs = async (contactUsData: contactUsDocument) => {
  try {
    const createdContactUs = await contactUsModel.create(contactUsData);
    logger.info('Contact Us created successfully', { createdContactUs });
    return createdContactUs;
  } catch (error: any) {
    logger.error(error);
    throw error;
  }
};

// getAllContactUs
export const getAllContactUs = async () => {
  try {
    const contactUs = await contactUsModel
      .find({})
      .populate('createdBy', 'name email')
      .exec();
    logger.info('Fetched all Contact Us profiles successfully', { contactUs });
    return contactUs;
  } catch (error: any) {
    logger.error(error);
    throw error;
  }
};

// getContactUsById
export const getContactUsById = async (contactUsId: string) => {
  try {
    const contactUs = await contactUsModel
      .findById(contactUsId)
      .populate('createdBy', 'name email')
      .exec();
    logger.info('Fetched Contact Us profile successfully', { contactUs });
    return contactUs;
  } catch (error: any) {
    logger.error(error);
    throw error;
  }
};

// deleteContactUs
export const deleteContactUs = async (contactUsId: string) => {
  try {
    const deletedContactUs = await contactUsModel
      .findByIdAndDelete(contactUsId)
      .exec();
    logger.info('Deleted Contact Us profile successfully', {
      deletedContactUs,
    });
    return deletedContactUs;
  } catch (error: any) {
    logger.error(error);
    throw error;
  }
};
