import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichChieuTheoPhimComponent } from './lich-chieu-theo-phim.component';

describe('LichChieuTheoPhimComponent', () => {
  let component: LichChieuTheoPhimComponent;
  let fixture: ComponentFixture<LichChieuTheoPhimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LichChieuTheoPhimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LichChieuTheoPhimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
