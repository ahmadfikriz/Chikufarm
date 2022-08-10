import { PartialType } from '@nestjs/swagger';
import { CreateProdukPusatDto } from './create-produk_pusat.dto';

export class UpdateProdukPusatDto extends PartialType(CreateProdukPusatDto) {}
