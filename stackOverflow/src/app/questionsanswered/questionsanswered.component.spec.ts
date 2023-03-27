import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsansweredComponent } from './questionsanswered.component';

describe('QuestionsansweredComponent', () => {
  let component: QuestionsansweredComponent;
  let fixture: ComponentFixture<QuestionsansweredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsansweredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsansweredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
