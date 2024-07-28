import { Component, EventEmitter, Output } from '@angular/core';
import { ProdutoService } from '../../../produtos/services/produto.service';
import { Produto } from '../../../../interfaces/produto';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-buscar-produto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-buscar-produto.component.html',
  styleUrl: './modal-buscar-produto.component.css',
})
export class ModalBuscarProdutoComponent {
  @Output() showModalBuscarProduto = new EventEmitter<void>();
  @Output() produtoSelecionado = new EventEmitter<Produto>();

  produtos$ = new Observable<Produto[]>();
  produtoSearchForm = new FormControl();

  ngOnInit() {
    this.searchProduto();
  }

  closeModal() {
    this.showModalBuscarProduto.emit();
  }

  selectProduto(produto: Produto) {
    this.produtoSelecionado.emit(produto);
    this.closeModal();
  }

  searchProduto() {
    this.produtos$ = this.produtoSearchForm.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        if (searchTerm.trim() === '') {
          return of([]);
        } else {
          return this.produtoService
            .search(searchTerm)
            .pipe(catchError(() => of([])));
        }
      })
    );
  }

  constructor(private produtoService: ProdutoService) {}
}
