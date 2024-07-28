import { Component, Input } from '@angular/core';
import { CotacaoService } from '../../../cotacoes/services/cotacao.service';
import { Observable } from 'rxjs';
import { Cotacao } from '../../../../interfaces/cotacao';
import { CommonModule } from '@angular/common';
import { ModalIncluirItemCotacaoComponent } from '../modal-incluir-item-cotacao/modal-incluir-item-cotacao.component';

import { ItemCotacao } from '../../../../interfaces/itemCotacao';
import { RemoverItemCotacao } from '../../../../types/removerItemCotacao';
import { ModalCodigoSimilarComponent } from '../modal-codigo-similar/modal-codigo-similar.component';

@Component({
  selector: 'app-cotacao-vendas-detalhes',
  standalone: true,
  imports: [
    CommonModule,
    ModalIncluirItemCotacaoComponent,
    ModalCodigoSimilarComponent,
  ],
  templateUrl: './cotacao-vendas-detalhes.component.html',
  styleUrl: './cotacao-vendas-detalhes.component.css',
})
export class CotacaoVendasDetalhesComponent {
  @Input() cotacaoId = '';
  isModalIncluirItemCotacaoShow = false;
  isModalCodigoSimilarShow = false;

  cotacao$ = new Observable<Cotacao>();
  itemCotacao$ = new Observable<ItemCotacao>();
  itemId = '';

  constructor(private cotacaoService: CotacaoService) {}

  ngOnInit(): void {
    this.getCotacao();
  }

  getCotacao() {
    this.cotacao$ = this.cotacaoService.getById(this.cotacaoId);
  }

  removerItemCotacao(itemId: string) {
    const item: RemoverItemCotacao = {
      cotacaoId: this.cotacaoId,
      itemId: itemId,
    };
    this.cotacaoService.removerItem(item).subscribe(() => {
      this.getCotacao();
    });
  }

  listarPrecoItemCotacao(itemId: string) {
    this.itemCotacao$ = this.cotacaoService.getItensCotacao(itemId);
  }

  showIncluirItemCotacao() {
    this.isModalIncluirItemCotacaoShow = !this.isModalIncluirItemCotacaoShow;
  }

  showCodigoSimilar(itemId: string) {
    this.itemId = itemId;
    this.isModalCodigoSimilarShow = !this.isModalCodigoSimilarShow;
  }
}
