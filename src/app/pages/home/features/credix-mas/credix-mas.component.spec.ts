import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredixMasComponent } from './credix-mas.component';

describe('CredixMasComponent', () => {
  let component: CredixMasComponent;
  let fixture: ComponentFixture<CredixMasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredixMasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixMasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
