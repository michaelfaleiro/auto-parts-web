import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Orcamento } from '../../../interfaces/orcamento';
import { map, Observable } from 'rxjs';
import { AdicionarItemOrcamento } from '../../../types/adicionarItemOrcamento';
import { AdicionarAvulsoOrcamento } from '../../../types/adicionarAvulsoOrcamento';

@Injectable({
  providedIn: 'root',
})
export class OrcamentoService {
  private url = `${environment.apiUrl}/orcamentos`;

  constructor(private http: HttpClient) {}

  create(clienteId: string, veiculoId: string): Observable<Orcamento> {
    console.log('clienteId', clienteId);
    console.log('veiculoId', veiculoId);
    return this.http
      .post<{ data: Orcamento; erros: string[] }>(this.url, {
        clienteId,
        veiculoId,
        statusId: 'b6e70b9b-3785-4b3d-4041-08dca6cc81e8',
      })
      .pipe(map((response) => response.data));
  }

  getById(id: string): Observable<Orcamento> {
    return this.http
      .get<{ data: Orcamento; errors: string[] }>(`${this.url}/${id}`)
      .pipe(map((response) => response.data));
  }

  getAll(): Observable<Orcamento[]> {
    return this.http
      .get<{ data: Orcamento[] }>(this.url)
      .pipe(map((response) => response.data));
  }

  update(orcamento: Orcamento): Observable<Orcamento> {
    return this.http
      .put<{ data: Orcamento; errors: string[] }>(
        `${this.url}/${orcamento.id}`,
        {
          ...orcamento,
        }
      )
      .pipe(map((response) => response.data));
  }

  delete(id: string): Observable<Orcamento> {
    return this.http
      .delete<{ data: Orcamento; errors: string[] }>(`${this.url}/${id}`)
      .pipe(map((response) => response.data));
  }

  adicionarItem(item: AdicionarItemOrcamento) {
    return this.http
      .post<{ data: Orcamento; errors: string[] }>(
        `${this.url}/adicionar-item`,
        {
          orcamentoId: item.orcamentoId,
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          valorUnitario: item.valorUnitario,
        }
      )
      .pipe();
  }

  updateItem(item: AdicionarItemOrcamento) {
    return this.http
      .put<{ data: Orcamento; errors: string[] }>(
        `${this.url}/atualizar-item`,
        {
          orcamentoId: item.orcamentoId,
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          valorUnitario: item.valorUnitario,
        }
      )
      .pipe();
  }

  removerItem(orcamentoId: string, itemId: string) {
    return this.http
      .delete<{ data: Orcamento; errors: string[] }>(
        `${this.url}/remover-item`,
        {
          body: {
            orcamentoId: orcamentoId,
            itemId: itemId,
          },
        }
      )
      .pipe();
  }

  adicionarAvulso(avulso: AdicionarAvulsoOrcamento) {
    return this.http
      .post<{ data: Orcamento; errors: string[] }>(
        `${this.url}/adicionar-item-avulso`,
        {
          orcamentoId: avulso.orcamentoId,
          sku: avulso.sku,
          nome: avulso.nome,
          fabricante: avulso.fabricante,
          quantidade: avulso.quantidade,
          valorVenda: avulso.valorVenda,
        }
      )
      .pipe();
  }

  updateAvulso(avulso: AdicionarAvulsoOrcamento) {
    return this.http
      .put<{ data: Orcamento; errors: string[] }>(
        `${this.url}/atualizar-item-avulso`,
        {
          orcamentoId: avulso.orcamentoId,
          itemId: avulso.id,
          sku: avulso.sku,
          nome: avulso.nome,
          fabricante: avulso.fabricante,
          quantidade: avulso.quantidade,
          valorVenda: avulso.valorVenda,
        }
      )
      .pipe();
  }

  removerAvulso(orcamentoId: string, itemId: string) {
    return this.http
      .delete<{ data: Orcamento; errors: string[] }>(
        `${this.url}/remover-item-avulso`,
        {
          body: {
            orcamentoId: orcamentoId,
            itemId: itemId,
          },
        }
      )
      .pipe();
  }
}
