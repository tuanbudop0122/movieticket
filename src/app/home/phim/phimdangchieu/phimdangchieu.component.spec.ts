import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhimdangchieuComponent } from './phimdangchieu.component';

describe('PhimdangchieuComponent', () => {
  let component: PhimdangchieuComponent;
  let fixture: ComponentFixture<PhimdangchieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhimdangchieuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhimdangchieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
