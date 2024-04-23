import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitCardComponent } from './produit-card.component';

describe('ProduitCardComponent', () => {
  let component: ProduitCardComponent;
  let fixture: ComponentFixture<ProduitCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitCardComponent]
    });
    fixture = TestBed.createComponent(ProduitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
