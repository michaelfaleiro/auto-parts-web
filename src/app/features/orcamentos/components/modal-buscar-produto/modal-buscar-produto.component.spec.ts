import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBuscarProdutoComponent } from './modal-buscar-produto.component';

describe('ModalBuscarProdutoComponent', () => {
  let component: ModalBuscarProdutoComponent;
  let fixture: ComponentFixture<ModalBuscarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBuscarProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBuscarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
