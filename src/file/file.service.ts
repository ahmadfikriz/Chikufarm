import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async renameUploadFile(filename: string) {
    let newFilename = `${filename}`;

    fs.rename(`./uploads/${filename}`, `./uploads/${newFilename}`, () => {});

    return newFilename;
  }
}
