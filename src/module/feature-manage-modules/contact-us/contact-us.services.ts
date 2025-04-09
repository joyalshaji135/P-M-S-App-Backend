import mongoose from 'mongoose';
import logger from '@utils/logger';
import Log from '@models/lookups-models/log.model';
import { contactUsDocument } from '@src/models/feature-manage-modules-models/contact-us.model';
import * as contactUsRepository from './contact-us.repository';

// addContactUs
export const createContactUsProfile = async (
  contactUsData: contactUsDocument,
) => {
  try {
    const createdContactUs =
      await contactUsRepository.createContactUs(contactUsData);
    logger.info('Contact Us created successfully', { createdContactUs });
    return createdContactUs;
  } catch (error: any) {
    logger.error(error);
    throw error;
  }
};

// getAllContactUsProfile

export const getAllContactUsProfile = async () => {
  try {
    const contactUs = await contactUsRepository.getAllContactUs();
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
    const contactUs = await contactUsRepository.getContactUsById(contactUsId);
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
    const deletedContactUs =
      await contactUsRepository.deleteContactUs(contactUsId);
    logger.info('Deleted Contact Us profile successfully', {
      deletedContactUs,
    });
    return deletedContactUs;
  } catch (error: any) {
    logger.error(error);
    throw error;
  }
};
