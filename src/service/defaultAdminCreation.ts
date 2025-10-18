import customerModels, {
  customerDocument,
} from '@src/models/master-manage-modules-models/customer.models';
import bcrypt from 'bcryptjs';
import logger from '@src/utils/logger';

// export const createDefaultAdmin = async (): Promise<void> => {
//   try {

//     const adminEmail: string = process.env.ADMIN_EMAIL || '';

//     const existingAdmin: customerDocument | null = await customerModels.findOne({
//       isDefault: true,
//       email: adminEmail
//     });

//     if (existingAdmin) {
//       logger.info('Default admin already exists');
//       return;
//     }

//     const adminPassword: string = process.env.ADMIN_PASSWORD || '';
//     const adminName: string = process.env.ADMIN_NAME || 'Della Hamill';
//     const adminPhone: string = process.env.ADMIN_PHONE || '584-911-0862';

//     if (!adminEmail || !adminPassword) {
//       logger.error('Admin email or password is not set in environment variables');
//       return;
//     }

//     const hashedPassword: string = await bcrypt.hash(adminPassword, 10);

//     const newAdmin: customerDocument = new customerModels({
//       name: adminName,
//       email: adminEmail,
//       phone: adminPhone,
//       role: 'admin',
//       password: hashedPassword,
//       isDefault: true,
//       address: {
//         street: process.env.ADMIN_ADDRESS_STREET || "Casey Forge",
//         city: process.env.ADMIN_ADDRESS_CITY || "Collierville",
//         state: process.env.ADMIN_ADDRESS_STATE || "Oberbrunner Club",
//         district: process.env.ADMIN_ADDRESS_DISTRICT || "Christian Turnpike",
//         zipCode: process.env.ADMIN_ADDRESS_ZIPCODE || "SE"
//       },
//       isDeleted: false,
//       deletedBy: "",
//       deletedAt: ""
//     });

//     await newAdmin.save();
//     logger.info('Default admin created successfully');
//   } catch (error) {
//     logger.error('Error creating default admin:', error);
//   }
// };

export const defaultAdminServices = async (): Promise<customerDocument> => {
  try {
    logger.info('🛠️ [DefaultAdmin] Initializing default admin creation...');

    // 🌱 Environment variables
    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD;

    if (!defaultEmail || !defaultPassword) {
      logger.error(
        '🚨 Missing environment variables: DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD',
      );
      throw new Error(
        'DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD is not set',
      );
    }

    // 🔎 Check for existing admin
    const existingAdmin = await customerModels.findOne({ email: defaultEmail });
    if (existingAdmin) {
      logger.info('✅ [DefaultAdmin] Admin already exists, skipping creation.');
      return existingAdmin;
    }

    // 🔒 Hash the password securely
    logger.info('🔒 [DefaultAdmin] Hashing password...');
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // 📝 Create the admin user
    logger.info('📝 [DefaultAdmin] Creating default admin user...');
    const defaultAdmin = await customerModels.create({
      email: defaultEmail,
      password: hashedPassword,
      name: 'Default Admin',
      phone: '123-456-7890',
      role: 'admin',
      isDefault: true,
      preferences: {
        newsletter: true,
        notifications: false,
      },
      address: {
        street: process.env.ADMIN_ADDRESS_STREET || 'Casey Forge',
        city: process.env.ADMIN_ADDRESS_CITY || 'Collierville',
        state: process.env.ADMIN_ADDRESS_STATE || 'Oberbrunner Club',
        district: process.env.ADMIN_ADDRESS_DISTRICT || 'Christian Turnpike',
        zipCode: process.env.ADMIN_ADDRESS_ZIPCODE || 'SE',
      },
    });

    logger.info('🎉 [DefaultAdmin] Default admin created successfully:', {
      id: defaultAdmin._id,
      email: defaultAdmin.email,
    });

    return defaultAdmin;
  } catch (error: any) {
    logger.error('❌ [DefaultAdmin] Error creating default admin:', error);
    throw new Error(error.message ?? 'Error creating default admin');
  }
};
