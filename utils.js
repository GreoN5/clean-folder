import fs from 'fs';

export const transferFile = (path, targetPath) => {
  const readStream = fs.createReadStream(path);
  const writeStream = fs.createWriteStream(targetPath);

  readStream.pipe(writeStream);

  writeStream.on('close', () => {
    console.log(`File has been successfully moved to ${targetPath}.`);
  });

  writeStream.on('error', () => {
    console.log(`An error occurred while transferring you file to ${targetPath}.`);
  });

  readStream.on('close', () => {
    fs.unlink(path, () => {
      console.log(`File ${path} has been successfully moved to ${targetPath}.`);
    });
  });

  readStream.on('error', () => {
    console.log(`An error occurred while reading from ${path}.`);
  });
};
