import { Component } from '@angular/core';
import { CotacaoService } from '../../services/cotacao.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cotacao } from '../../../../interfaces/cotacao';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-cotacao',
  standalone: true,
  imports: [CommonModule, NgxMaskPipe],
  templateUrl: './cotacao.component.html',
  styleUrl: './cotacao.component.css',
})
export class CotacaoComponent {
  cotacaoId = '';
  cotacao$ = new Observable<Cotacao>();

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
}
