import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapitemComponent } from './rapitem.component';

describe('RapitemComponent', () => {
  let component: RapitemComponent;
  let fixture: ComponentFixture<RapitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
