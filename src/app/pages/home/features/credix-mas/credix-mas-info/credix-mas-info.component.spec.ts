import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredixMasInfoComponent } from './credix-mas-info.component';

describe('CredixMasInfoComponent', () => {
  let component: CredixMasInfoComponent;
  let fixture: ComponentFixture<CredixMasInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredixMasInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixMasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
