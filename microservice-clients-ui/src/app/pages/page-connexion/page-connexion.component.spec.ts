import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConnexionComponent } from './page-connexion.component';

describe('PageConnexionComponent', () => {
  let component: PageConnexionComponent;
  let fixture: ComponentFixture<PageConnexionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageConnexionComponent]
    });
    fixture = TestBed.createComponent(PageConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
