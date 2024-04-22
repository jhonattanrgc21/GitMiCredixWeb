import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredixMasPopupComponent } from './credix-mas-popup.component';

describe('CredixMasPopupComponent', () => {
  let component: CredixMasPopupComponent;
  let fixture: ComponentFixture<CredixMasPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredixMasPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixMasPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
