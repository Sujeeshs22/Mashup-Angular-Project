import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowquestionComponent } from './showquestion.component';

describe('ShowquestionComponent', () => {
  let component: ShowquestionComponent;
  let fixture: ComponentFixture<ShowquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowquestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
