import fs from 'fs';
import {
  COMPRESSED_FILES_EXTENSIONS,
  DISC_MEDIA_FILES_EXTENSIONS,
  EXE_FILES_EXTENSIONS,
  IGNORED_EXTENSIONS,
  IMAGE_FILES_EXTENSIONS,
  MUSIC_FILES_EXTENSIONS,
  PDF_FILES_EXTENSIONS,
  PRESENTATION_FILES_EXTENSIONS,
  SPREADSHEET_FILES_EXTENSIONS,
  TEXT_FILES_EXTENSIONS,
  WORD_FILES_EXTENSIONS,
} from './const.js';
import { transferFile } from './utils.js';
import 'dotenv/config';

const { DOWNLOADS_PATH, MOVE_DIR } = process.env;

if (!fs.existsSync(DOWNLOADS_PATH)) {
  console.log('Sorry, this type of path does not exists.');
  process.exit(-1);
}

fs.readdir(DOWNLOADS_PATH, (error, files) => {
  if (error) {
    console.log(`An error occurred while reading in ${DOWNLOADS_PATH}`);
    process.exit(-1);
  } else {
    if (!files.length) {
      console.log('There were no files found to be moved!');
      process.exit(0);
    }

    for (const file of files) {
      const fileExtension = file.split('.')[1];
      const fileExtensionWithDot = '.' + fileExtension;

      try {
        if (!fileExtension) {
          // handling folder transfer
          fs.cpSync(`${DOWNLOADS_PATH}\\${file}`, `${MOVE_DIR}\\folders\\${file}`, {
            recursive: true,
          });

          fs.rm(`${DOWNLOADS_PATH}\\${file}`, { recursive: true }, () => {
            console.log(`Folder successfully moved to ${MOVE_DIR}\\folders.`);
          });
          continue;
        }

        if (IGNORED_EXTENSIONS.includes(fileExtensionWithDot)) {
          continue;
        }

        if (MUSIC_FILES_EXTENSIONS.includes(fileExtensionWithDot)) {
          transferFile(`${DOWNLOADS_PATH}\\${file}`, `${MOVE_DIR}\\music\\${file}`);
          continue;
        }

        if (COMPRESSED_FILES_EXTENSIONS.includes(fileExtensionWithDot)) {
          transferFile(`${DOWNLOADS_PATH}\\${file}`, `${MOVE_DIR}\\compressed\\${file}`);
          continue;
        }

        if (DISC_MEDIA_FILES_EXTENSIONS.includes(fileExtensionWithDot)) {
          transferFile(`${DOWNLOADS_PATH}\\${file}`, `${MOVE_DIR}\\disc_media\\${file}`);
          continue;
        }

        if (EXE_FILES_EXTENSIONS.includes(fileExtensionWithDot)) {
          transferFile(`${DOWNLOADS_PATH}\\${file}`, `${MOVE_DIR}\\exe\\${file}`);
          continue;
        }

        if (PRESENTATION_FILES_EXTENSIONS.includes(fileExtensionWithDot)) {
          transferFile(`${DOWNLOADS_PATH}\\${file}`, `${MOVE_DIR}\\powerpoint\\${file}`);
          continue;
        }

        if (SPREADSHEET_FILES_EXTENSIONS.includes(fileExtensionWithDot)) {
          transferFile(`${DOWNLOADS_PATH}\\${file}`, `${MOVE_DIR}\\excel\\${file}`);
          continue;
        }

        if (WORD_FILES_EXTENSIONS.includes(fileExtensionWithDot)) {
          transferFile(`${DOWNLOADS_PATH}\\${file}`, `${MOVE_DIR}\\word\\${file}`);
          continue;
        }

        if (TEXT_FILES_EXTENSIONS.includes(fileExtensionWithDot)) {
          transferFile(`${DOWNLOADS_PATH}\\${file}`, `${MOVE_DIR}\\txt\\${file}`);
          continue;
        }

        if (PDF_FILES_EXTENSIONS.includes(fileExtensionWithDot)) {
          transferFile(`${DOWNLOADS_PATH}\\${file}`, `${MOVE_DIR}\\pdf\\${file}`);
          continue;
        }

        if (IMAGE_FILES_EXTENSIONS.includes(fileExtensionWithDot)) {
          transferFile(`${DOWNLOADS_PATH}\\${file}`, `${MOVE_DIR}\\images\\${file}`);
          continue;
        }

        transferFile(`${DOWNLOADS_PATH}\\${file}`, `${MOVE_DIR}\\others\\${file}`);
      } catch (error) {
        console.log(`An error occurred while moving files/folders.`);
        process.exit(-1);
      }
    }
  }
});
