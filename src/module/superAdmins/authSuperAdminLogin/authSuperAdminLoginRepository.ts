import superAdminModel, {
  superAdminDocument,
} from '../../../model/superAdmin/superAdminModel';

export const findByEmail = async (
  email: string,
): Promise<superAdminDocument | null> => {
  return await superAdminModel.findOne({ email });
};
