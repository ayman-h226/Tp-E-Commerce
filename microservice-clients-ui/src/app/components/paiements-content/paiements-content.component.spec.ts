import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementsContentComponent } from './paiements-content.component';

describe('PaiementsContentComponent', () => {
  let component: PaiementsContentComponent;
  let fixture: ComponentFixture<PaiementsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaiementsContentComponent]
    });
    fixture = TestBed.createComponent(PaiementsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
