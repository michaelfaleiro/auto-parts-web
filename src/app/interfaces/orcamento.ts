import { Cliente } from './cliente';
import { Cotacao } from './cotacao';
import { ItemAvulsoOrcamento } from './itemAvulsoOrcamento';
import { ItemOrcamento } from './itemOrcamento';
import { Veiculo } from './veiculo';

export interface Orcamento {
  id: string;
  cliente: Cliente;
  veiculo: Veiculo;
  items: ItemOrcamento[];
  itemAvulsos: ItemAvulsoOrcamento[];
  cotacoes: Cotacao[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
