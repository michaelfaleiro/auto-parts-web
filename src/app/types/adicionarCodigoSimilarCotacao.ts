import { TipoCodigoSimilar } from '../enums/tipoCodigoSimilar';

export type AdicionarCodigoSimilarCotacao = {
  itemId: string;
  sku: string;
  fabricante: string;
  tipo: TipoCodigoSimilar;
};
