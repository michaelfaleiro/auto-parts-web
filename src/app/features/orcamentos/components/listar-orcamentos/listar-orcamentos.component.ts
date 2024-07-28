import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrcamentoService } from '../../services/orcamento.service';
import { Observable } from 'rxjs';
import { Orcamento } from '../../../../interfaces/orcamento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-orcamentos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './listar-orcamentos.component.html',
  styleUrl: './listar-orcamentos.component.css',
})
export class ListarOrcamentosComponent {
  orcamentos$ = new Observable<Orcamento[]>();

  constructor(private orcamentoService: OrcamentoService) {}

  ngOnInit() {
    this.getOrcamentos();
  }

  getOrcamentos(): Observable<Orcamento[]> {
    return (this.orcamentos$ = this.orcamentoService.getAll());
  }
}
