import superAdminModel, {
  superAdminDocument,
} from '@models/superAdmin/superAdminModel';

export const findByEmail = async (
  email: string,
): Promise<superAdminDocument | null> => {
  return await superAdminModel.findOne({ email });
};
