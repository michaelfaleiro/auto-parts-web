import { Cliente } from './cliente';
import { ItemCotacao } from './itemCotacao';
import { Veiculo } from './veiculo';

export interface Cotacao {
  id: string;
  cliente: Cliente;
  veiculo: Veiculo;
  items: ItemCotacao[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
