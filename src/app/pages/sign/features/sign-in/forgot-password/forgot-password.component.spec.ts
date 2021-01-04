import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ForgotPasswordComponent} from './forgot-password.component';
import {ModalService} from 'src/app/core/services/modal.service';
import {HttpService} from 'src/app/core/services/http.service';

describe('ForgotPasswordComponent', () => {
  let dialog: MatDialog;
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let element: HTMLElement;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [ReactiveFormsModule, FormsModule, MatDialogModule, HttpClientTestingModule],
      providers: [ModalService, HttpService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    // debug = fixture.debugElement.query(By.css('ng-template'))
    // element = debug.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.forgotPasswordForm.valid).toBeFalsy();
  });

  it('button shouldn\'t work when invalid', () => {
    expect(component.forgotPasswordForm.valid).toBeFalsy();
    spyOn(component, 'submit');
    element = fixture.debugElement.query(By.css('credix-button')).nativeElement;
    element.click();
    expect(component.submit).toHaveBeenCalledTimes(0);

  });

  it('form should be invalid if passwords do not match', () => {
    expect(component.forgotPasswordForm.valid).toBeFalsy();
    component.forgotPasswordForm.controls.identificationType.setValue('Cédula de identidad');
    component.forgotPasswordForm.controls.identification.setValue('26245152');
    component.forgotPasswordForm.controls.password.setValue('12345');
    component.forgotPasswordForm.controls.confirmPassword.setValue('123456');
    component.forgotPasswordForm.controls.code.setValue('681379');
    expect(component.forgotPasswordForm.valid).toBeFalsy();

  });

  it('submitting a form when valid', fakeAsync(() => {
    expect(component.forgotPasswordForm.valid).toBeFalsy();
    expect(component.submitted).toBeFalsy();
    component.forgotPasswordForm.controls.identType.setValue('Cédula de identidad');
    component.forgotPasswordForm.controls.identNumber.setValue('26245152');
    component.forgotPasswordForm.controls.password.setValue('12345');
    component.forgotPasswordForm.controls.confirmPassword.setValue('12345');
    component.forgotPasswordForm.controls.code.setValue('681379');
    expect(component.forgotPasswordForm.valid).toBeTruthy();
    spyOn(component, 'submit');
    element = fixture.debugElement.query(By.css('credix-button')).nativeElement;
    element.click();
    tick();
    fixture.detectChanges();
    expect(component.submitted).toBeTruthy();
  }));

});
