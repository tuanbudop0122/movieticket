import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemphimComponent } from './itemphim.component';

describe('ItemphimComponent', () => {
  let component: ItemphimComponent;
  let fixture: ComponentFixture<ItemphimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemphimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemphimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
