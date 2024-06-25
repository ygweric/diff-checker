import { promises as fs } from 'fs';
import path from 'path';
import viteCofnig from "../vite.config.js";

async function manageBuildFolder() {
  const distPath = path.resolve('./dist');
  const buildPath = path.join(distPath, viteCofnig.base);

  try {
    // Check if the build folder exists
    const buildFolderExists = await fs.stat(buildPath).then(stat => stat.isDirectory()).catch(() => false);

    if (buildFolderExists) {
      // Clear the build folder if it exists
      const files = await fs.readdir(buildPath);
      for (const file of files) {
        await fs.unlink(path.join(buildPath, file));
      }
    } else {
      // Create the build folder if it doesn't exist
      await fs.mkdir(buildPath);
    }

    // Move all files from dist to build
    const files = await fs.readdir(distPath);
    for (const file of files) {
      if (file !== viteCofnig.base) {
        await fs.rename(path.join(distPath, file), path.join(buildPath, file));
      }
    }

    console.log('Files moved to build folder successfully.');
  } catch (error) {
    console.error('Error managing build folder:', error);
  }
}

manageBuildFolder();
