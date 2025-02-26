import customerModel, {
  customerDocument,
} from '@models/Customers/customizeCustomerModel';

export const findByEmail = async (
  email: string,
): Promise<customerDocument | null> => {
  return await customerModel.findOne({ email });
};
