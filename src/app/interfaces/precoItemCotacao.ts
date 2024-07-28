import { Fornecedor } from './fornecedor';

export interface PrecoItemCotacao {
  id: string;
  quantidadeAtendida: number;
  sku: string;
  fabricante: string;
  valorCusto: number;
  valorVenda: number;
  prazoExpedicao: number;
  observacao: string;
  fornecedor: Fornecedor;
  createdAt: string;
  updatedAt: string;
}
