import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotacaoVendasComponent } from './cotacao-vendas.component';

describe('CotacaoVendasComponent', () => {
  let component: CotacaoVendasComponent;
  let fixture: ComponentFixture<CotacaoVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotacaoVendasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotacaoVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
