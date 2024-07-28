import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CotacaoService } from '../../../cotacoes/services/cotacao.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdicionarCodigoSimilarCotacao } from '../../../../types/adicionarCodigoSimilarCotacao';
import { CodigoSimilar } from '../../../../interfaces/codigoSimilar';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../../shared/messages/services/message.service';
import { TipoCodigoSimilar } from '../../../../enums/tipoCodigoSimilar';

@Component({
  selector: 'app-modal-codigo-similar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-codigo-similar.component.html',
  styleUrl: './modal-codigo-similar.component.css',
})
export class ModalCodigoSimilarComponent {
  @ViewChild('skuInput') skuInput!: ElementRef;
  @Output() showModalCodigoSimilar = new EventEmitter<void>();
  @Input() itemId = '';

  codigoSimilarId = '';

  codigoSimilares$ = new Observable<CodigoSimilar[]>();

  similarForm = new FormGroup({
    sku: new FormControl('', [Validators.required]),
    fabricante: new FormControl('', [Validators.required]),
    tipo: new FormControl(1),
  });

  constructor(
    private cotacaoService: CotacaoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getSimilar();
  }

  ngAfterViewInit() {
    this.skuInput.nativeElement.focus();
  }

  submit() {
    if (this.similarForm.valid) {
      if (this.codigoSimilarId) {
        this.updateCodigoSimilar(this.codigoSimilarId);
      } else {
        this.adicionarCodigoSimilar();
      }
    }
  }

  getSimilar() {
    this.codigoSimilares$ = this.cotacaoService.getSimilaresByItemId(
      this.itemId
    );
  }

  adicionarCodigoSimilar() {
    const codigoSimilar: AdicionarCodigoSimilarCotacao = {
      itemId: this.itemId,
      sku: this.similarForm.get('sku')?.value!,
      fabricante: this.similarForm.get('fabricante')?.value!,
      tipo: Number(this.similarForm.get('tipo')?.value!),
    };

    this.cotacaoService.adicionarCodigoSimilar(codigoSimilar).subscribe(() => {
      this.getSimilar();
      this.messageService.success('Código similar adicionado com sucesso!');
      this.limparForm();
    });
  }

  updateCodigoSimilar(codigoSimilarId: string) {
    const codigoSimilar: AdicionarCodigoSimilarCotacao = {
      itemId: this.itemId,
      sku: this.similarForm.get('sku')?.value!,
      fabricante: this.similarForm.get('fabricante')?.value!,
      tipo: this.similarForm.get('tipo')?.value!,
    };

    this.cotacaoService
      .updateCodigoSimilare(codigoSimilarId, codigoSimilar)
      .subscribe(() => {
        this.getSimilar();
        this.messageService.success('Código similar atualizado com sucesso!');
        this.limparForm();
      });
  }

  removeCodigoSimilar(id: string) {
    this.cotacaoService.removerCodigoSimilar(id).subscribe(() => {
      this.getSimilar();
      this.messageService.success('Código similar removido com sucesso!');
    });
  }

  editarCodigoSimilar(codigoSimilar: CodigoSimilar) {
    this.codigoSimilarId = codigoSimilar.id;
    this.similarForm.get('sku')?.setValue(codigoSimilar.sku);
    this.similarForm.get('fabricante')?.setValue(codigoSimilar.fabricante);
    this.similarForm.get('tipo')?.setValue(codigoSimilar.tipo);
  }

  getTipoCodigoSimilarNome(tipo: TipoCodigoSimilar) {
    return TipoCodigoSimilar[tipo];
  }

  closeModal() {
    this.showModalCodigoSimilar.emit();
  }

  limparForm() {
    this.similarForm.reset();
    this.codigoSimilarId = '';
  }
}
