"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAdminServices = void 0;
const customer_models_1 = __importDefault(require("@src/models/master-manage-modules-models/customer.models"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger_1 = __importDefault(require("@src/utils/logger"));
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
const defaultAdminServices = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        logger_1.default.info('🛠️ [DefaultAdmin] Initializing default admin creation...');
        // 🌱 Environment variables
        const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL;
        const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD;
        if (!defaultEmail || !defaultPassword) {
            logger_1.default.error('🚨 Missing environment variables: DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD');
            throw new Error('DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD is not set');
        }
        // 🔎 Check for existing admin
        const existingAdmin = yield customer_models_1.default.findOne({ email: defaultEmail });
        if (existingAdmin) {
            logger_1.default.info('✅ [DefaultAdmin] Admin already exists, skipping creation.');
            return existingAdmin;
        }
        // 🔒 Hash the password securely
        logger_1.default.info('🔒 [DefaultAdmin] Hashing password...');
        const hashedPassword = yield bcryptjs_1.default.hash(defaultPassword, 10);
        // 📝 Create the admin user
        logger_1.default.info('📝 [DefaultAdmin] Creating default admin user...');
        const defaultAdmin = yield customer_models_1.default.create({
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
        logger_1.default.info('🎉 [DefaultAdmin] Default admin created successfully:', {
            id: defaultAdmin._id,
            email: defaultAdmin.email,
        });
        return defaultAdmin;
    }
    catch (error) {
        logger_1.default.error('❌ [DefaultAdmin] Error creating default admin:', error);
        throw new Error((_a = error.message) !== null && _a !== void 0 ? _a : 'Error creating default admin');
    }
});
exports.defaultAdminServices = defaultAdminServices;
