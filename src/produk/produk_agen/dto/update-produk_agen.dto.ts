import { PartialType } from '@nestjs/mapped-types';
import { CreateProdukAgenDto } from './create-produk_agen.dto';

export class UpdateProdukAgenDto extends PartialType(CreateProdukAgenDto) {}
