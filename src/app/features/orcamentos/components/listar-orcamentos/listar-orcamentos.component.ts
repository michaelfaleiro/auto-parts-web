import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrcamentoService } from '../../services/orcamento.service';
import { Observable } from 'rxjs';
import { Orcamento } from '../../../../interfaces/orcamento';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../../shared/messages/services/message.service';

@Component({
  selector: 'app-listar-orcamentos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './listar-orcamentos.component.html',
  styleUrl: './listar-orcamentos.component.css',
})
export class ListarOrcamentosComponent {
  orcamentos$ = new Observable<Orcamento[]>();

  constructor(
    private orcamentoService: OrcamentoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getOrcamentos().subscribe(
      () => {},
      (error) => {
        this.messageService.error(error.error.errors[0]);
      }
    );
  }

  getOrcamentos(): Observable<Orcamento[]> {
    return (this.orcamentos$ = this.orcamentoService.getAll());
  }
}
