import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredixMasAccountInfoComponent } from './credix-mas-account-info.component';

describe('CredixMasAccountInfoComponent', () => {
  let component: CredixMasAccountInfoComponent;
  let fixture: ComponentFixture<CredixMasAccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredixMasAccountInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixMasAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
