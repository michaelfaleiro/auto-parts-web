import { Component } from '@angular/core';
import { CotacaoService } from '../../services/cotacao.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cotacao } from '../../../../interfaces/cotacao';
import { CommonModule } from '@angular/common';
import { NgxMaskPipe } from 'ngx-mask';
import { ModalPrecoFornecedorComponent } from '../modal-preco-fornecedor/modal-preco-fornecedor.component';
import { ItemCotacao } from '../../../../interfaces/itemCotacao';
import { ModalCodigoSimilarComponent } from '../../../orcamentos/components/modal-codigo-similar/modal-codigo-similar.component';

@Component({
  selector: 'app-cotacao',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskPipe,
    ModalPrecoFornecedorComponent,
    ModalCodigoSimilarComponent,
  ],
  templateUrl: './cotacao.component.html',
  styleUrl: './cotacao.component.css',
})
export class CotacaoComponent {
  cotacaoId = '';
  itemId = '';
  precoItemId = '';
  cotacao$ = new Observable<Cotacao>();
  itemCotacao$ = new Observable<ItemCotacao>();

  isModalPrecoFornecedorVisible = false;
  isModalCodigoSimilarShow = false;

  constructor(
    private cotacaoService: CotacaoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.cotacaoId = params['id'];
    });
    this.getCotacao();
  }

  getCotacao() {
    this.cotacao$ = this.cotacaoService.getById(this.cotacaoId);
  }

  getPrecoItemCotacao(itemId: string) {
    this.itemCotacao$ = this.cotacaoService.getItensCotacao(itemId);
  }

  editarItemCotacao(itemId: string, precoItemId: string) {
    this.precoItemId = precoItemId;
    this.showModalPrecoFornecedor(itemId);
  }

  removerPrecoItemCotacao(itemId: string, precoItemId: string) {
    this.cotacaoService
      .removerPrecoFornecedor(itemId, precoItemId)
      .subscribe(() => {
        this.getCotacao();
        this.getPrecoItemCotacao(itemId);
      });
  }

  showModalPrecoFornecedor(itemId: string) {
    this.itemId = itemId;
    this.isModalPrecoFornecedorVisible = !this.isModalPrecoFornecedorVisible;
  }

  showCodigoSimilar(itemId: string) {
    this.itemId = itemId;
    this.isModalCodigoSimilarShow = !this.isModalCodigoSimilarShow;
  }
}
