import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagintaionComponent } from './pagintaion.component';

describe('PagintaionComponent', () => {
  let component: PagintaionComponent;
  let fixture: ComponentFixture<PagintaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagintaionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagintaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
