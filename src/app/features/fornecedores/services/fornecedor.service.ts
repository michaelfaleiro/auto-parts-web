import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Fornecedor } from '../../../interfaces/fornecedor';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  private url = `${environment.apiUrl}/fornecedores`;

  constructor(private http: HttpClient) {}

  create(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http
      .post<{ data: Fornecedor; errors: string[] }>(this.url, fornecedor)
      .pipe(map((response) => response.data));
  }

  getAll(): Observable<Fornecedor[]> {
    return this.http
      .get<{ data: Fornecedor[]; errors: string[] }>(this.url)
      .pipe(map((response) => response.data));
  }

  getById(id: string): Observable<Fornecedor> {
    return this.http
      .get<{ data: Fornecedor; errors: string[] }>(`${this.url}/${id}`)
      .pipe(map((response) => response.data));
  }

  update(id: string, fornecedor: Fornecedor) {
    return this.http
      .put<{ data: Fornecedor; errors: string[] }>(
        `${this.url}/${id}`,
        fornecedor
      )
      .pipe();
  }

  delete(id: string) {
    return this.http
      .delete<{ data: Fornecedor; errors: string[] }>(`${this.url}/${id}`)
      .pipe();
  }
}
