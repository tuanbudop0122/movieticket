import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HethongrapComponent } from './hethongrap.component';

describe('HethongrapComponent', () => {
  let component: HethongrapComponent;
  let fixture: ComponentFixture<HethongrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HethongrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HethongrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
