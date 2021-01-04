import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixImageUploadComponent} from './credix-image-upload.component';

describe('CredixImageUploadComponent', () => {
  let component: CredixImageUploadComponent;
  let fixture: ComponentFixture<CredixImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixImageUploadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
