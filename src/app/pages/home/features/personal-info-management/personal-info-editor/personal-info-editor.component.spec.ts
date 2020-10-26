import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalInfoEditorComponent} from './personal-info-editor.component';

describe('PersonalInfoEditorComponent', () => {
  let component: PersonalInfoEditorComponent;
  let fixture: ComponentFixture<PersonalInfoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalInfoEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
