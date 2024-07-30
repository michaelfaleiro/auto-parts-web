import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CotacaoService } from '../../services/cotacao.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdicionarPrecoFornecedor } from '../../../../types/adicionarPrecoFornecedor';
import { MessageService } from '../../../../shared/messages/services/message.service';
import { CommonModule } from '@angular/common';
import { NgxCurrencyDirective } from 'ngx-currency';
import { FornecedorService } from '../../../fornecedores/services/fornecedor.service';
import { Observable } from 'rxjs';
import { Fornecedor } from '../../../../interfaces/fornecedor';
import { ActivatedRoute } from '@angular/router';
import { PrecoItemCotacao } from '../../../../interfaces/precoItemCotacao';
import { ItemCotacao } from '../../../../interfaces/itemCotacao';

@Component({
  selector: 'app-modal-preco-fornecedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxCurrencyDirective],
  templateUrl: './modal-preco-fornecedor.component.html',
  styleUrl: './modal-preco-fornecedor.component.css',
})
export class ModalPrecoFornecedorComponent {
  @Output() showModalPrecoFornecedor = new EventEmitter<void>();
  @Output() updateCotacao = new EventEmitter<void>();
  @Input() itemId = '';
  @Input() precoItemId = '';

  fornecedores$ = new Observable<Fornecedor[]>();

  cotacaoId = '';

  precoItemCotacao$: PrecoItemCotacao | null = null;

  precoForm = new FormGroup({
    cotacaoId: new FormControl(''),
    itemId: new FormControl(''),
    fornecedorId: new FormControl('', [Validators.required]),
    quantidadeAtendida: new FormControl(1, [
      Validators.required,
      Validators.min(1),
    ]),
    sku: new FormControl('', [Validators.required]),
    prazoExpedicao: new FormControl('', [Validators.required]),
    fabricante: new FormControl('', [Validators.required]),
    valorCusto: new FormControl(0, [Validators.required, Validators.min(0)]),
    valorVenda: new FormControl(0, [Validators.required, Validators.min(0)]),
    observacao: new FormControl(''),
  });

  constructor(
    private cotacaoService: CotacaoService,
    private messageService: MessageService,
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cotacaoId = this.route.snapshot.paramMap.get('id')!;
    this.getFornecedoresSelect();
    this.getPrecoItemCotacao(this.itemId, this.precoItemId);
  }

  submit() {
    if (this.precoForm.valid) {
      if (this.precoItemId) {
        this.updatePrecoFornecedor(this.precoItemId);
        this.updateCotacao.emit();
      } else {
        this.adicionarPrecoFornecedor();
      }
    } else {
      this.messageService.error('Preencha todos os campos obrigatórios');
    }
  }

  adicionarPrecoFornecedor() {
    const precoFornecedor: AdicionarPrecoFornecedor = {
      precoItemId: this.precoItemId,
      cotacaoId: this.cotacaoId,
      itemId: this.itemId,
      fornecedorId: this.precoForm.get('fornecedorId')?.value!,
      quantidadeAtendida: Number(
        this.precoForm.get('quantidadeAtendida')?.value!
      ),
      sku: this.precoForm.get('sku')?.value!,
      fabricante: this.precoForm.get('fabricante')?.value!,
      valorCusto: Number(this.precoForm.get('valorCusto')?.value!),
      valorVenda: Number(this.precoForm.get('valorVenda')?.value!),
      prazoExpedicao: Number(this.precoForm.get('prazoExpedicao')?.value!),
      observacao: this.precoForm.get('observacao')?.value!,
    };

    this.cotacaoService.adicionarPrecoFornecedor(precoFornecedor).subscribe(
      () => {
        this.messageService.success('Preço adicionado com sucesso');
        this.closeModal();
      },
      (error) => {
        this.messageService.error(error.error.errors[0]);
      }
    );
  }

  updatePrecoFornecedor(precoItemId: string) {
    const precoFornecedor: AdicionarPrecoFornecedor = {
      precoItemId: precoItemId,
      cotacaoId: this.cotacaoId,
      itemId: this.itemId,
      fornecedorId: this.precoForm.get('fornecedorId')?.value!,
      quantidadeAtendida: Number(
        this.precoForm.get('quantidadeAtendida')?.value!
      ),
      sku: this.precoForm.get('sku')?.value!,
      fabricante: this.precoForm.get('fabricante')?.value!,
      valorCusto: Number(this.precoForm.get('valorCusto')?.value!),
      valorVenda: Number(this.precoForm.get('valorVenda')?.value!),
      prazoExpedicao: Number(this.precoForm.get('prazoExpedicao')?.value!),
      observacao: this.precoForm.get('observacao')?.value!,
    };
    this.cotacaoService.updatePrecoFornecedor(precoFornecedor).subscribe(
      () => {
        this.messageService.success('Preço atualizado com sucesso');
        this.closeModal();
      },
      (error) => {
        this.messageService.error(error.error.errors[0]);
      }
    );
  }

  getPrecoItemCotacao(itemId: string, precoItemId: string) {
    this.cotacaoService.getItensCotacao(itemId).subscribe((preco) => {
      const precoItem = preco.precoItemCotacoes.find(
        (precoItem) => precoItem.id === precoItemId
      );
      this.precoItemCotacao$ = precoItem ? precoItem : null;
      this.precoItemId = precoItemId;

      this.precoForm.patchValue({
        cotacaoId: this.cotacaoId,
        itemId: this.itemId,
        fornecedorId: this.precoItemCotacao$?.fornecedor.id,
        quantidadeAtendida: this.precoItemCotacao$?.quantidadeAtendida,
        sku: this.precoItemCotacao$?.sku,
        fabricante: this.precoItemCotacao$?.fabricante,
        valorCusto: this.precoItemCotacao$?.valorCusto,
        valorVenda: this.precoItemCotacao$?.valorVenda,
        prazoExpedicao: this.precoItemCotacao$?.prazoExpedicao.toString(),
        observacao: this.precoItemCotacao$?.observacao,
      });
    });
  }

  getFornecedoresSelect() {
    this.fornecedores$ = this.fornecedorService.getAll();
  }

  closeModal() {
    this.showModalPrecoFornecedor.emit();
  }
}
