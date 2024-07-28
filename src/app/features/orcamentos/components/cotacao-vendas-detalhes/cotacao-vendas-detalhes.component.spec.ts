import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotacaoVendasDetalhesComponent } from './cotacao-vendas-detalhes.component';

describe('CotacaoVendasDetalhesComponent', () => {
  let component: CotacaoVendasDetalhesComponent;
  let fixture: ComponentFixture<CotacaoVendasDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotacaoVendasDetalhesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotacaoVendasDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
