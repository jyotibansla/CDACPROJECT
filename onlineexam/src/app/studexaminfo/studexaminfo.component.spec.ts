import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudexaminfoComponent } from './studexaminfo.component';

describe('StudexaminfoComponent', () => {
  let component: StudexaminfoComponent;
  let fixture: ComponentFixture<StudexaminfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudexaminfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudexaminfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
