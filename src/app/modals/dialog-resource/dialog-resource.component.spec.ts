import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResourceComponent } from './dialog-resource.component';

describe('DialogResourceComponent', () => {
  let component: DialogResourceComponent;
  let fixture: ComponentFixture<DialogResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
