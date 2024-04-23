import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesContentComponent } from './commandes-content.component';

describe('CommandesContentComponent', () => {
  let component: CommandesContentComponent;
  let fixture: ComponentFixture<CommandesContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandesContentComponent]
    });
    fixture = TestBed.createComponent(CommandesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
