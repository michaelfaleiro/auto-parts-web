export type AdicionarPrecoFornecedor = {
  precoItemId: string;
  cotacaoId: string;
  itemId: string;
  fornecedorId: string;
  quantidadeAtendida: number;
  prazoExpedicao: number;
  sku: string;
  fabricante: string;
  valorCusto: number;
  valorVenda: number;
  observacao: string;
};
