import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Cliente } from '../../../interfaces/cliente';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<{ data: Cliente[] }>(this.url)
      .pipe(map((response) => response.data));
  }

  search(query: string): Observable<Cliente[]> {
    if (!query) {
      return of([]);
    }
    return this.http
      .get<{ data: Cliente[]; errors: string[] }>(
        `${this.url}/search?query=${query}`
      )
      .pipe(map((response) => response.data));
  }
}
