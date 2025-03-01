import customerModel, {
  customerDocument,
} from '@models/master-manage-modules-models/customer.models';

export const findByEmail = async (
  email: string,
): Promise<customerDocument | null> => {
  return await customerModel.findOne({ email });
};

// Find the role of the customer
export const findRole = async (
  role: string,
): Promise<customerDocument | null> => {
  return await customerModel.findOne({ role });
};
