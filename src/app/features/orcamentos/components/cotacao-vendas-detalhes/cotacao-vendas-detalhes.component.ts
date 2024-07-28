import { Component, Input } from '@angular/core';
import { CotacaoService } from '../../../cotacoes/services/cotacao.service';
import { map, Observable } from 'rxjs';
import { Cotacao } from '../../../../interfaces/cotacao';
import { CommonModule } from '@angular/common';
import { ModalIncluirItemCotacaoComponent } from '../modal-incluir-item-cotacao/modal-incluir-item-cotacao.component';
import { PrecoItemCotacao } from '../../../../interfaces/precoItemCotacao';

@Component({
  selector: 'app-cotacao-vendas-detalhes',
  standalone: true,
  imports: [CommonModule, ModalIncluirItemCotacaoComponent],
  templateUrl: './cotacao-vendas-detalhes.component.html',
  styleUrl: './cotacao-vendas-detalhes.component.css',
})
export class CotacaoVendasDetalhesComponent {
  @Input() cotacaoId = '';
  isModalIncluirItemCotacaoShow = false;

  cotacao$ = new Observable<Cotacao>();
  precoItemCotacao$ = new Observable<PrecoItemCotacao[]>();

  constructor(private cotacaoService: CotacaoService) {}

  ngOnInit(): void {
    this.getCotacao();
  }

  getCotacao() {
    this.cotacao$ = this.cotacaoService.getById(this.cotacaoId);
    console.log(this.cotacao$.subscribe((cotacao) => console.log(cotacao)));
  }

  listarPrecoItemCotacao(itemId: string) {
    this.precoItemCotacao$ = this.cotacao$.pipe(
      map(
        (cotacao) =>
          cotacao.items.find((item) => item.id === itemId)?.precoItem || []
      )
    );
  }

  showIncluirItemCotacao() {
    this.isModalIncluirItemCotacaoShow = !this.isModalIncluirItemCotacaoShow;
  }
}
