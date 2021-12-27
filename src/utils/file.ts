/* eslint-disable consistent-return */
import fs from 'fs';

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch {
    return 0;
  }
  await fs.promises.unlink(filename);
};
