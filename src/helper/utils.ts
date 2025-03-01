import * as fs from 'fs';
import * as path from 'path';

// Validation Error Message Utility
export const getMessageFromValidationError = (error: any) =>
  error.details[0].message.replace(/"/g, '');

interface MainImage {
  mimetype: string;
  data: Buffer;
}

export const uploadImage = async (
  mainImage: any,
  localFolder: string,
): Promise<string> => {
  if (!mainImage || !Array.isArray(mainImage) || mainImage.length === 0) {
    throw new Error('Invalid file: missing buffer or mimetype.');
  }

  const file = mainImage[0];

  if (!file.buffer) {
    throw new Error('Invalid file: missing buffer.');
  }

  let imageName = '';
  const filename = `${Date.now()}.png`;

  try {
    if (!fs.existsSync(localFolder)) {
      fs.mkdirSync(localFolder, { recursive: true });
    }

    const filePath = path.join(localFolder, filename);

    await fs.promises.writeFile(filePath, file.buffer);

    imageName = filePath;
  } catch (err) {
    console.error('Error saving file locally:', err);
    throw new Error('Error saving the file locally.');
  }

  return imageName;
};
