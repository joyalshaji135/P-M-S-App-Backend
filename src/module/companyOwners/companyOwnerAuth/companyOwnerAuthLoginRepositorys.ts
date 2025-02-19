import customerModel, {
  customerDocument,
} from '../../../model/Customers/customizeCustomerModel';

export const findByEmail = async (
  email: string,
): Promise<customerDocument | null> => {
  return await customerModel.findOne({ email });
};
