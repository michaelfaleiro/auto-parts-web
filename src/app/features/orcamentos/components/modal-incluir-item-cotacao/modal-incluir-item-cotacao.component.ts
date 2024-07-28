import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CotacaoService } from '../../../cotacoes/services/cotacao.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdicionarItemCotacao } from '../../../../types/adicionarItemCotacao';

@Component({
  selector: 'app-modal-incluir-item-cotacao',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-incluir-item-cotacao.component.html',
  styleUrl: './modal-incluir-item-cotacao.component.css',
})
export class ModalIncluirItemCotacaoComponent {
  @Input() cotacaoId = '';
  @Output() showModalIncluirItemCotacao = new EventEmitter<void>();
  @Output() itemAdicionado = new EventEmitter<void>();

  itemCotacaooForm = new FormGroup({
    cotacaoId: new FormControl(''),
    sku: new FormControl(''),
    nome: new FormControl(''),
    quantidade: new FormControl(),
    tipo: new FormControl(1),
  });

  constructor(private cotacaoService: CotacaoService) {}

  ngOnInit() {}

  submitItem() {
    this.adicionarItemCotacao();
  }

  adicionarItemCotacao() {
    const itemCotacao: AdicionarItemCotacao = {
      cotacaoId: this.cotacaoId,
      sku: this.itemCotacaooForm.get('sku')?.value!,
      nome: this.itemCotacaooForm.get('nome')?.value!,
      quantidade: this.itemCotacaooForm.get('quantidade')?.value,
      tipo: Number(this.itemCotacaooForm.get('tipo')?.value),
    };
    this.cotacaoService.adicionarItemCotacao(itemCotacao).subscribe(() => {
      this.closeModal();
      this.itemAdicionado.emit();
    });
  }

  closeModal() {
    this.showModalIncluirItemCotacao.emit();
  }
}
