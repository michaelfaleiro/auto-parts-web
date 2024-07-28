import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Orcamento } from '../../../interfaces/orcamento';
import { map, Observable } from 'rxjs';
import { Cotacao } from '../../../interfaces/cotacao';
import { AdicionarItemCotacao } from '../../../types/adicionarItemCotacao';
import { ItemCotacao } from '../../../interfaces/itemCotacao';
import { RemoverItemCotacao } from '../../../types/removerItemCotacao';
import { AdicionarCodigoSimilarCotacao } from '../../../types/adicionarCodigoSimilarCotacao';
import { CodigoSimilar } from '../../../interfaces/codigoSimilar';

@Injectable({
  providedIn: 'root',
})
export class CotacaoService {
  private url = `${environment.apiUrl}/cotacoes`;

  constructor(private http: HttpClient) {}

  create(orcamento: string): Observable<Cotacao> {
    return this.http
      .post<{ data: Cotacao; errors: string[] }>(this.url, {
        orcamentoId: orcamento,
        statusId: '269ea975-7d11-4fbd-a1db-08dca6cbd6f5',
      })
      .pipe(map((response) => response.data));
  }

  getAll(): Observable<Cotacao[]> {
    return this.http
      .get<{ data: Cotacao[]; errors: string[] }>(this.url)
      .pipe(map((response) => response.data));
  }

  getById(id: string): Observable<Cotacao> {
    return this.http
      .get<{ data: Cotacao; errors: string[] }>(`${this.url}/${id}`)
      .pipe(map((response) => response.data));
  }

  update(id: string, cotacao: Cotacao) {
    return this.http
      .put<{ data: Cotacao; errors: string[] }>(`${this.url}/${id}`, cotacao)
      .pipe();
  }

  removerItem(item: RemoverItemCotacao) {
    return this.http
      .delete<{ data: Cotacao; errors: string[] }>(`${this.url}/remover-item`, {
        body: item,
      })
      .pipe();
  }

  getItensCotacao(id: string): Observable<ItemCotacao> {
    return this.http
      .get<{ data: ItemCotacao; errors: string[] }>(`${this.url}/item/${id}`)
      .pipe(map((response) => response.data));
  }

  adicionarItemCotacao(itemCotacao: AdicionarItemCotacao) {
    return this.http
      .post<{ data: Cotacao; errors: string[] }>(
        `${this.url}/adicionar-item`,
        itemCotacao
      )
      .pipe();
  }

  getSimilaresByItemId(itemId: string): Observable<CodigoSimilar[]> {
    return this.http
      .get<{ data: CodigoSimilar[]; errors: string[] }>(
        `${this.url}/similares/${itemId}`
      )
      .pipe(map((response) => response.data));
  }

  adicionarCodigoSimilar(codigoSimilar: AdicionarCodigoSimilarCotacao) {
    return this.http
      .post<{ data: Cotacao; errors: string[] }>(
        `${this.url}/similares`,
        codigoSimilar
      )
      .pipe();
  }

  updateCodigoSimilare(
    id: string,
    codigoSimilar: AdicionarCodigoSimilarCotacao
  ) {
    return this.http
      .put<{ data: Cotacao; errors: string[] }>(`${this.url}/similares`, {
        id,
        sku: codigoSimilar.sku,
        fabricante: codigoSimilar.fabricante,
        tipo: codigoSimilar.tipo,
      })
      .pipe();
  }

  removerCodigoSimilar(codigoSimilar: string) {
    return this.http
      .delete<{ data: Cotacao; errors: string[] }>(
        `${this.url}/similares/${codigoSimilar}`
      )
      .pipe();
  }
}
