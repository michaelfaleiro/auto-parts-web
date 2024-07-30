import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../clientes/services/cliente.service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Cliente } from '../../../../interfaces/cliente';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { OrcamentoService } from '../../services/orcamento.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../../shared/messages/services/message.service';

@Component({
  selector: 'app-novo-orcamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskPipe, NgxMaskDirective],
  templateUrl: './novo-orcamento.component.html',
  styleUrl: './novo-orcamento.component.css',
})
export class NovoOrcamentoComponent implements OnInit {
  clientes$!: Observable<Cliente[]>;
  clienteSearch = new FormControl();

  constructor(
    private clienteService: ClienteService,
    private orcamentoService: OrcamentoService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.searchCliente();
  }

  searchCliente(): void {
    this.clientes$ = this.clienteSearch.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        if (searchTerm.trim() === '') {
          return of([]);
        } else {
          return this.clienteService
            .search(searchTerm)
            .pipe(catchError(() => of([])));
        }
      })
    );
  }

  createOrcamento(clienteId: string, veiculoId: string): void {
    this.orcamentoService.create(clienteId, veiculoId).subscribe(
      (orcamento) => {
        this.router.navigate(['/orcamento/', orcamento.id]);
      },
      (error) => {
        this.messageService.error(error.error.errors[0]);
      }
    );
  }
}
