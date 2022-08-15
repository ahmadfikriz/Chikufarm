/* eslint-disable prettier/prettier */
import { excelInserter } from './excel_inserter';
import * as moment from 'moment';
import * as path from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import { dataUser } from './dataUser';
import { dataTransaksiAgen } from './dataTransaksiAgen';
import { dataTransaksiPembeli } from './dataTransaksiPembeli';

export async function generateExcel(data, type) {
  try {
    const filename = `${moment().format('YYYYMMDDHHMM')}-${type}.xlsx`;
    const filepath = path.join(__dirname + '/../../uploads/export', filename);
    console.log(data,"ini datanya")
    await DataToExcel(filepath, data, type);
    return filename;
  }catch (e) {
    console.log(e,'generateExcel')
    throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

}

// const hitLogApiData = [
//   {
//     title: 'Time',
//     dataIndex: 'time',
//     width: 20,
//   },
//   {
//     title: 'Success',
//     dataIndex: 'success',
//     width: 20,
//   },
//   {
//     title: 'Failed',
//     dataIndex: 'failed',
//     width: 20,
//   },
//   {
//     title: 'Total',
//     dataIndex: 'total',
//     width: 20,
//   },
// ];



async function setDataHitLogApi(dataHitLogApi) {
  try {
    const dataFiltered = [];

    await dataHitLogApi.forEach((element) => {
      const filterElement = [];

      filterElement['id'] = element?.id;
      filterElement['nama'] = element?.nama;
      filterElement['email'] = element?.email;
      filterElement['no_hp'] = element?.no_hp;
      filterElement['alamat'] = element?.alamat;
      filterElement['role.role_type'] = element?.role.role_type;
      

      dataFiltered.push(filterElement);
    });

    return dataFiltered;
  } catch (e) {
    console.log(e, 'setDataHitLogAPI');
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

async function setDataHitTransaksiAgen(dataHitLogApi) {
  try {
    const dataFiltered = [];

    await dataHitLogApi.forEach((element) => {
      const filterElement = [];

      filterElement['id'] = element?.id;
      filterElement['user.nama'] = element?.user.nama;
      filterElement['produkPusat.nama_produk'] = element?.produkPusat.nama_produk;
      filterElement['request.id'] = element?.request.id;
      filterElement['total_bayar'] = element?.total_bayar;
      filterElement['bank.nama_bank'] = element?.bank.nama_bank;
      filterElement['tanggal'] =  element?.tanggal;
      

      dataFiltered.push(filterElement);
    });

    return dataFiltered;
  } catch (e) {
    console.log(e, 'setDataHitLogAPI');
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function DataToExcel(filepath, data, type) {
  try {
    if (type === 'dataUser') {
      const dataFiltered = await setDataHitLogApi(data);

      await excelInserter({
        filename: filepath,
        sheets: [
          {
            name: 'Data User',
            startRowFrom: 1,
            headers: dataUser,
            data: dataFiltered,
          },
        ],
      });
    } else if (type === 'dataTransaksiAgen') {
      const dataFiltered = await setDataHitTransaksiAgen(data);

      await excelInserter({
        filename: filepath,
        sheets: [
          {
            name: 'Data Transaksi Agen',
            startRowFrom: 1,
            headers: dataTransaksiAgen,
            data: dataFiltered,
          },
        ],
      });
    // } else if (type === 'dataTransaksiPembeli') {
    //     const dataFiltered = await setDataHitTransaction(data);
  
    //     await excelInserter({
    //       filename: filepath,
    //       sheets: [
    //         {
    //           name: 'Data Transaksi Pembeli',
    //           startRowFrom: 1,
    //           headers: dataTransaksiPembeli,
    //           data: dataFiltered,
    //         },
    //       ],
    //     });
    } else if (type === 'Customer-Register') {
      //kode yang sama tapi beda set header dan data nya
    } else if (type === 'Summary-Services') {
      //kode yang sama tapi beda set header dan data nya
    } else if (type === 'Top-Rate') {
      //kode yang sama tapi beda set header dan data nya
    }
  } catch (e) {
    console.log(e, 'dataToExcel');
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
