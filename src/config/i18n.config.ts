import path from 'path';
import { I18n } from 'i18n';

// Configure i18n instance
const i18n = new I18n({
  locales: ['en', 'de'], // List of supported locales
  directory: path.join(__dirname, '../locales'), // Path to translation files
  updateFiles: false, // Prevent automatic updates to translation files
});

export default i18n;
