import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Produto } from '../../../interfaces/produto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private url = `${environment.apiUrl}/produtos`;

  constructor(private http: HttpClient) {}

  search(query: string): Observable<Produto[]> {
    return this.http
      .get<{ data: Produto[] }>(`${this.url}/search?query=${query}`)
      .pipe(map((response) => response.data));
  }
}
