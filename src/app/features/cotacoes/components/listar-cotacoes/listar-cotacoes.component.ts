import { Component } from '@angular/core';
import { CotacaoService } from '../../services/cotacao.service';
import { Observable } from 'rxjs';
import { Cotacao } from '../../../../interfaces/cotacao';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-cotacoes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-cotacoes.component.html',
  styleUrl: './listar-cotacoes.component.css',
})
export class ListarCotacoesComponent {
  cotacoes$ = new Observable<Cotacao[]>();

  constructor(private cotacaoService: CotacaoService) {}

  ngOnInit(): void {
    this.getCotacoes();
  }

  getCotacoes(): Observable<Cotacao[]> {
    return (this.cotacoes$ = this.cotacaoService.getAll());
  }
}
