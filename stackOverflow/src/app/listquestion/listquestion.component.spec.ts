import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListquestionComponent } from './listquestion.component';

describe('ListquestionComponent', () => {
  let component: ListquestionComponent;
  let fixture: ComponentFixture<ListquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListquestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
