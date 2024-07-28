import { Veiculo } from './veiculo';

export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  cpfCnpj: string;
  veiculos: Veiculo[];
  createdAt: Date;
  updatedAt: Date;
}
