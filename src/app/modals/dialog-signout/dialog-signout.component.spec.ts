import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSignoutComponent } from './dialog-signout.component';

describe('DialogSignoutComponent', () => {
  let component: DialogSignoutComponent;
  let fixture: ComponentFixture<DialogSignoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSignoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
