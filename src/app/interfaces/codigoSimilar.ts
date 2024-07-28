import { TipoCodigoSimilar } from '../enums/tipoCodigoSimilar';

export interface CodigoSimilar {
  id: string;
  sku: string;
  fabricante: string;
  itemId: string;
  tipo: TipoCodigoSimilar;
}
