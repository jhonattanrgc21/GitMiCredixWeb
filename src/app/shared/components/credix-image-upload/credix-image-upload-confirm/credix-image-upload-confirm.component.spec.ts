import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixImageUploadConfirmComponent} from './credix-image-upload-confirm.component';

describe('CredixImageUploadConfirmComponent', () => {
  let component: CredixImageUploadConfirmComponent;
  let fixture: ComponentFixture<CredixImageUploadConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixImageUploadConfirmComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixImageUploadConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
