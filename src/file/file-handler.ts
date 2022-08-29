/* eslint-disable prettier/prettier */
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as moment from 'moment';
import { HttpException, HttpStatus } from '@nestjs/common';

export const editFileName = (req, file, callback) => {
  const fileExtName = path.extname(file.originalname);
  const name = uuid.v4();

  const dir = `./uploads`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const d = new Date();

  if (
    ['.png', '.jpg', '.jpeg', '.JPEG', '.JPG', '.PNG', '.pdf', '.PDF'].includes(
      fileExtName,
    )
  ) {
    callback(
      null,
      `${name}_${moment().format('YYYYMMDDHHmmss')}${fileExtName}`,
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

export const editFileNameProdukAgen = (req, file, callback) => {
  const fileExtName = path.extname(file.originalname);
  const name = uuid.v4();

  const dir = `./uploads/Produk Agen`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const d = new Date();

  if (
    ['.png', '.jpg', '.jpeg', '.JPEG', '.JPG', '.PNG', '.pdf', '.PDF'].includes(
      fileExtName,
    )
  ) {
    callback(
      null,
      `post/${name}_${moment().format('YYYYMMDDHHmmss')}${fileExtName}`,
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

export const editFileNameTransaksiAgen = (req, file, callback) => {
  const fileExtName = path.extname(file.originalname);
  const name = uuid.v4();

  const dir = `./uploads/Transaksi Agen`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const d = new Date();

  if (
    ['.png', '.jpg', '.jpeg', '.JPEG', '.JPG', '.PNG', '.pdf', '.PDF'].includes(
      fileExtName,
    )
  ) {
    callback(
      null,
      `event/${name}_${moment().format('YYYYMMDDHHmmss')}${fileExtName}`,
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

export const editFileNameTransaksiPembeli = (req, file, callback) => {
  const fileExtName = path.extname(file.originalname);
  const name = uuid.v4();

  const dir = `./uploads/Transaksi Pembeli`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const d = new Date();

  if (
    ['.png', '.jpg', '.jpeg', '.JPEG', '.JPG', '.PNG', '.pdf', '.PDF'].includes(
      fileExtName,
    )
  ) {
    callback(
      null,
      `contestan/${name}_${moment().format('YYYYMMDDHHmmss')}${fileExtName}`,
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
