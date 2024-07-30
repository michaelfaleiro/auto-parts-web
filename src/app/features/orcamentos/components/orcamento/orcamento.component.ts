import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrcamentoService } from '../../services/orcamento.service';
import { Orcamento } from '../../../../interfaces/orcamento';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxMaskPipe } from 'ngx-mask';
import { NgxCurrencyDirective } from 'ngx-currency';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdicionarItemOrcamento } from '../../../../types/adicionarItemOrcamento';
import { Produto } from '../../../../interfaces/produto';
import { AdicionarAvulsoOrcamento } from '../../../../types/adicionarAvulsoOrcamento';
import { ModalBuscarProdutoComponent } from '../modal-buscar-produto/modal-buscar-produto.component';
import { ItemOrcamento } from '../../../../interfaces/itemOrcamento';
import { ItemAvulsoOrcamento } from '../../../../interfaces/itemAvulsoOrcamento';
import { CotacaoVendasComponent } from '../cotacao-vendas/cotacao-vendas.component';
import { MessageService } from '../../../../shared/messages/services/message.service';

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskPipe,
    NgxCurrencyDirective,
    ModalBuscarProdutoComponent,
    CotacaoVendasComponent,
    FormsModule,
  ],
  templateUrl: './orcamento.component.html',
  styleUrl: './orcamento.component.css',
})
export class OrcamentoComponent {
  @ViewChild('quantidadeInput') quantidadeInput!: ElementRef;

  orcamentoId = '';
  orcamento$ = new Observable<Orcamento>();
  isModalBuscarProduto = false;
  editarItem = false;
  isCotacaoVendasShow = false;

  valorCupom = 0;
  descontoPecas = 0;
  valorFrete = 0;

  itemForm = new FormGroup({
    avulsoId: new FormControl(''),
    produtoId: new FormControl(''),
    quantidade: new FormControl(1, [Validators.required, Validators.min(1)]),
    sku: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    fabricante: new FormControl('', [Validators.required]),
    desconto: new FormControl(''),
    valorUnitario: new FormControl('', [
      Validators.required,
      Validators.min(0.01),
    ]),
  });

  constructor(
    private orcamentoService: OrcamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.orcamentoId = params['id'];
    });
    this.getOrcamento(this.orcamentoId);
    this.limparForm();
  }

  valorTotalOrcamento(
    pecas: number,
    cupom: number,
    desconto: number,
    frete: number
  ) {
    const total = pecas - cupom - desconto + frete;
    return total;
  }

  showModalBuscarProduto() {
    this.isModalBuscarProduto = !this.isModalBuscarProduto;
  }

  showCotacaoVendas() {
    this.isCotacaoVendasShow = !this.isCotacaoVendasShow;
  }

  getOrcamento(id: string): Observable<Orcamento> {
    return (this.orcamento$ = this.orcamentoService.getById(id));
  }

  submitItem() {
    if (this.itemForm.invalid) {
      this.messageService.error('Preencha todos os campos obrigatórios!');
      return;
    }

    const produtoId = this.itemForm.get('produtoId')?.value;

    if (produtoId) {
      this.editarItem
        ? this.updateItemOrcamento()
        : this.adicionarItemOrcamento();
    } else {
      this.editarItem ? this.updateAvulso() : this.adicionarAvulso();
    }
  }

  carregarProduto(produto: Produto) {
    this.itemForm.patchValue({
      produtoId: produto.id,
      sku: produto.sku,
      nome: produto.nome,
      quantidade: 1,
      fabricante: produto.fabricante,
      valorUnitario: produto.valorVenda.toString(),
    });
    this.itemForm.get('quantidade')?.enable();
    this.itemForm.get('valorUnitario')?.enable();
    this.quantidadeInput.nativeElement.focus();
  }

  editarItemOrcamento(item: ItemOrcamento) {
    this.itemForm.patchValue({
      produtoId: item.produtoId,
      sku: item.sku,
      nome: item.nome,
      quantidade: item.quantidade,
      fabricante: item.fabricante,
      valorUnitario: item.valorUnitario.toString(),
    });
    this.itemForm.get('quantidade')?.enable();
    this.itemForm.get('valorUnitario')?.enable();
    this.quantidadeInput.nativeElement.focus();
    this.editarItem = true;
  }

  adicionarItemOrcamento() {
    const item: AdicionarItemOrcamento = {
      orcamentoId: this.orcamentoId,
      produtoId: this.itemForm.get('produtoId')?.value!,
      quantidade: Number(this.itemForm.get('quantidade')?.value),
      valorUnitario: Number(this.itemForm.get('valorUnitario')?.value),
    };
    this.orcamentoService.adicionarItem(item).subscribe(
      () => {
        (this.orcamento$ = this.getOrcamento(this.orcamentoId)),
          this.limparForm();
        this.messageService.success('Item adicionado com sucesso!');
      },
      (error) => {
        this.messageService.error(error.error.errors[0]);
      }
    );
  }

  updateItemOrcamento() {
    const item: AdicionarItemOrcamento = {
      orcamentoId: this.orcamentoId,
      produtoId: this.itemForm.get('produtoId')?.value!,
      quantidade: Number(this.itemForm.get('quantidade')?.value),
      valorUnitario: Number(this.itemForm.get('valorUnitario')?.value),
    };
    this.orcamentoService.updateItem(item).subscribe(
      () => {
        (this.orcamento$ = this.getOrcamento(this.orcamentoId)),
          this.limparForm();
        this.messageService.success('Item atualizado com sucesso!');
      },
      (error) => {
        this.messageService.error(error.error.errors[0]);
      }
    );
  }

  removerItemOrcamento(itemId: string) {
    this.orcamentoService.removerItem(this.orcamentoId, itemId).subscribe(
      () => {
        this.getOrcamento(this.orcamentoId);
        this.messageService.success('Item removido com sucesso!');
      },
      (error) => {
        this.messageService.error(error.error.errors[0]);
      }
    );
  }

  inputAvulso() {
    this.itemForm.get('produtoId')?.reset();
    this.itemForm.get('produtoId')?.disable();
    this.itemForm.get('quantidade')?.enable();
    this.itemForm.get('valorUnitario')?.enable();
    this.itemForm.get('sku')?.enable();
    this.itemForm.get('nome')?.enable();
    this.itemForm.get('fabricante')?.enable();
    this.quantidadeInput.nativeElement.focus();
  }

  adicionarAvulso() {
    const item: AdicionarAvulsoOrcamento = {
      orcamentoId: this.orcamentoId,
      quantidade: Number(this.itemForm.get('quantidade')?.value),
      sku: this.itemForm.get('sku')?.value!,
      nome: this.itemForm.get('nome')?.value!,
      fabricante: this.itemForm.get('fabricante')?.value!,
      valorVenda: Number(this.itemForm.get('valorUnitario')?.value),
    };
    this.orcamentoService.adicionarAvulso(item).subscribe(
      () => {
        (this.orcamento$ = this.getOrcamento(this.orcamentoId)),
          this.limparForm();
        this.messageService.success('Item avulso adicionado com sucesso!');
      },
      (error) => {
        this.messageService.error(error.error.errors[0]);
      }
    );
  }

  editarItemAvulso(item: ItemAvulsoOrcamento) {
    this.itemForm.patchValue({
      avulsoId: item.id,
      quantidade: item.quantidade,
      sku: item.sku,
      nome: item.nome,
      fabricante: item.fabricante,
      valorUnitario: item.valorVenda.toString(),
    });
    this.itemForm.enable();
    this.quantidadeInput.nativeElement.focus();
    this.editarItem = true;
  }

  updateAvulso() {
    const avulso: AdicionarAvulsoOrcamento = {
      orcamentoId: this.orcamentoId,
      id: this.itemForm.get('avulsoId')?.value!,
      quantidade: Number(this.itemForm.get('quantidade')?.value),
      sku: this.itemForm.get('sku')?.value!,
      nome: this.itemForm.get('nome')?.value!,
      fabricante: this.itemForm.get('fabricante')?.value!,
      valorVenda: Number(this.itemForm.get('valorUnitario')?.value),
    };
    this.orcamentoService.updateAvulso(avulso).subscribe(
      () => {
        (this.orcamento$ = this.getOrcamento(this.orcamentoId)),
          this.limparForm();
        this.messageService.success('Item avulso atualizado com sucesso!');
      },
      (error) => {
        this.messageService.error(error.error.errors[0]);
      }
    );
  }

  removerAvulso(itemId: string) {
    this.orcamentoService.removerAvulso(this.orcamentoId, itemId).subscribe(
      () => {
        this.getOrcamento(this.orcamentoId);
        this.messageService.success('Item avulso removido com sucesso!');
      },
      (error) => {
        this.messageService.error(error.error.errors[0]);
      }
    );
  }

  limparForm() {
    this.itemForm.reset();
    this.itemForm.disable();
    this.editarItem = false;
  }
}
