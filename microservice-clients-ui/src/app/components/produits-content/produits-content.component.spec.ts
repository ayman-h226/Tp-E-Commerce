import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsContentComponent } from './produits-content.component';

describe('ProduitsContentComponent', () => {
  let component: ProduitsContentComponent;
  let fixture: ComponentFixture<ProduitsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitsContentComponent]
    });
    fixture = TestBed.createComponent(ProduitsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
