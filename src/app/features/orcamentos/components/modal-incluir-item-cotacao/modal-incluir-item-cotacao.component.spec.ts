import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIncluirItemCotacaoComponent } from './modal-incluir-item-cotacao.component';

describe('ModalIncluirItemCotacaoComponent', () => {
  let component: ModalIncluirItemCotacaoComponent;
  let fixture: ComponentFixture<ModalIncluirItemCotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalIncluirItemCotacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalIncluirItemCotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
