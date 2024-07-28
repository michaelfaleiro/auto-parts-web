import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCodigoSimilarComponent } from './modal-codigo-similar.component';

describe('ModalCodigoSimilarComponent', () => {
  let component: ModalCodigoSimilarComponent;
  let fixture: ComponentFixture<ModalCodigoSimilarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCodigoSimilarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCodigoSimilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
