import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOrcamentosComponent } from './listar-orcamentos.component';

describe('ListarOrcamentosComponent', () => {
  let component: ListarOrcamentosComponent;
  let fixture: ComponentFixture<ListarOrcamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarOrcamentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarOrcamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
