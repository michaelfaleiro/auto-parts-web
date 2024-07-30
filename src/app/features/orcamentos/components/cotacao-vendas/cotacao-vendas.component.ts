import { Component, Input } from '@angular/core';
import { CotacaoService } from '../../../cotacoes/services/cotacao.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Cotacao } from '../../../../interfaces/cotacao';
import { Orcamento } from '../../../../interfaces/orcamento';
import { CotacaoVendasDetalhesComponent } from '../cotacao-vendas-detalhes/cotacao-vendas-detalhes.component';
import { MessageService } from '../../../../shared/messages/services/message.service';

@Component({
  selector: 'app-cotacao-vendas',
  standalone: true,
  imports: [
    CommonModule,
    CotacaoVendasComponent,
    CotacaoVendasDetalhesComponent,
  ],
  templateUrl: './cotacao-vendas.component.html',
  styleUrl: './cotacao-vendas.component.css',
})
export class CotacaoVendasComponent {
  @Input() orcamento$ = new Observable<Orcamento>();

  constructor(
    private cotacaoService: CotacaoService,
    private messageService: MessageService
  ) {}

  cotacao$ = new Observable<Cotacao>();
  cotacaoId = '';
  orcamentoId = '';
  isCotacaoDetalhesShow = false;

  ngOnInit(): void {
    this.carregarCotacao();
  }

  showCotacaoDetalhes(cotacaoId: string) {
    this.isCotacaoDetalhesShow = true;
    this.cotacaoId = cotacaoId;
  }

  carregarCotacao() {
    this.orcamento$.subscribe(
      (orcamento) => {
        this.orcamentoId = orcamento.id;
      },
      (error) => {
        this.messageService.error(error.error.errors[0]);
      }
    );
  }

  createCotacao() {
    this.cotacaoService.create(this.orcamentoId).subscribe(
      (cotacao) => {
        this.cotacaoId = cotacao.id;
        this.carregarCotacao();
        this.messageService.success('Cotação criada com sucesso');
      },
      (error) => {
        this.messageService.error(error.error.errors[0]);
      }
    );
  }
}
