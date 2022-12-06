import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolblockComponent } from './toolblock.component';

describe('ToolblockComponent', () => {
  let component: ToolblockComponent;
  let fixture: ComponentFixture<ToolblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
