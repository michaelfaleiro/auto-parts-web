import { CodigoSimilar } from './codigoSimilar';
import { PrecoItemCotacao } from './precoItemCotacao';

export interface ItemCotacao {
  id: string;
  quantidade: number;
  nome: string;
  sku: string;
  tipo: string;
  codigosimilares: CodigoSimilar[];
  precoItem: PrecoItemCotacao[];
  createdAt: string;
  updatedAt: string;
}