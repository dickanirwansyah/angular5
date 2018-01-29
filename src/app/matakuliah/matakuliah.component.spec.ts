import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatakuliahComponent } from './matakuliah.component';

describe('MatakuliahComponent', () => {
  let component: MatakuliahComponent;
  let fixture: ComponentFixture<MatakuliahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatakuliahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatakuliahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
