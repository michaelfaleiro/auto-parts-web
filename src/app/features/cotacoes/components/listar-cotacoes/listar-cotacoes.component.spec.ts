import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCotacoesComponent } from './listar-cotacoes.component';

describe('ListarCotacoesComponent', () => {
  let component: ListarCotacoesComponent;
  let fixture: ComponentFixture<ListarCotacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCotacoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarCotacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
