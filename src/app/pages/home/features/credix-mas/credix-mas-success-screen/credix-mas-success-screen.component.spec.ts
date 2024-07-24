import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredixMasSuccessScreenComponent } from './credix-mas-success-screen.component';

describe('CredixMasSuccessScreenComponent', () => {
  let component: CredixMasSuccessScreenComponent;
  let fixture: ComponentFixture<CredixMasSuccessScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredixMasSuccessScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixMasSuccessScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
