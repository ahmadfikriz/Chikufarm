/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as moment from 'moment';
import * as uuid from 'uuid';

export const editFileName = (req, file, callback) => {
  const fileExtName = path.extname(file.originalname);
  const user = req.user;
  let instituteName;
  if (req.query.instituteName) {
    instituteName = req.query.instituteName.replace(/ /gi, '_');
  } else {
    instituteName = user?.instituteName?.replace(/ /gi, '_');
  }

  const dir = `./uploads/${instituteName}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log(fileExtName, 'fileExtName');

  const d = new Date();

  if (
    ['.png', '.jpg', '.JPEG', '.JPG', '.PNG', '.PDF', '.pdf'].includes(
      fileExtName,
    )
  ) {
    callback(
      null,
      `${instituteName}/${instituteName}_${moment().format(
        'YYYYMMDDHHmmss',
      )}${fileExtName}`,
    );
  } else {
    callback(
      new HttpException(
        `Unsupported file type ${path.extname(
          file.originalname,
        )}, the document must be .pdf, .png, .jpg, or .jpeg`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
};

export const editFileNameRegister = (req, file, callback) => {
  const fileExtName = path.extname(file.originalname);
  const dir = `./uploads/profile`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const d = new Date();

  if (
    ['.png', '.jpg', '.jpeg', '.JPEG', '.JPG', '.PNG', '.pdf', '.PDF'].includes(
      fileExtName,
    )
  ) {
    callback(null, `profile/profile_${req.query.name}${fileExtName}`);
  } else {
    callback(
      new HttpException(
        `Unsupported file type ${path.extname(
          file.originalname,
        )}, the document must be .pdf, .png, .jpg, or .jpeg`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
};

export const editFileNameExport = (req, file, callback) => {
  const fileExtName = path.extname(file.originalname);
  const fileName = file.originalname;
  const dir = `./uploads`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const d = new Date();

  callback(null, `export/${fileName}`);
};
