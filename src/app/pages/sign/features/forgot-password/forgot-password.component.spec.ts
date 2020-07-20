import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import {By} from "@angular/platform-browser";
import {MatDialog,MatDialogModule} from "@angular/material/dialog";
import { HttpClientTestingModule } from '@angular/common/http/testing';
//import { Router } from "@angular/router";

import { ForgotPasswordComponent } from './forgot-password.component';
import { ModalService } from "src/app/core/services/modal.service";
import { HttpService } from "src/app/core/services/http.service";


describe('ForgotPasswordComponent', () => {
  let dialog: MatDialog;
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let element: HTMLElement;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [ReactiveFormsModule, FormsModule, MatDialogModule, HttpClientTestingModule],
      providers: [ModalService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    //debug = fixture.debugElement.query(By.css('ng-template'))
    //element = debug.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("form invalid when empty", () => {
    expect(component.forgotPassForm.valid).toBeFalsy();
  });

  it("button shouldn't work when invalid", () => {
    expect(component.forgotPassForm.valid).toBeFalsy();
    spyOn(component, 'submit');
    element = fixture.debugElement.query(By.css('credix-button')).nativeElement;
    element.click();
    expect(component.submit).toHaveBeenCalledTimes(0);

  })

  it('form should be invalid if passwords do not match', () => {
    expect(component.forgotPassForm.valid).toBeFalsy();
    component.forgotPassForm.controls['identType'].setValue('Cédula de identidad');
    component.forgotPassForm.controls['identNumber'].setValue('26245152');
    component.forgotPassForm.controls['password'].setValue('12345');
    component.forgotPassForm.controls['confirmPassword'].setValue('123456');
    component.forgotPassForm.controls['code'].setValue('681379');
    expect(component.forgotPassForm.valid).toBeFalsy();

  });

  it('submitting a form when valid', fakeAsync(() => {
    expect(component.forgotPassForm.valid).toBeFalsy();
    expect(component.submitted).toBeFalsy();
    component.forgotPassForm.controls['identType'].setValue('Cédula de identidad');
    component.forgotPassForm.controls['identNumber'].setValue('26245152');
    component.forgotPassForm.controls['password'].setValue('12345');
    component.forgotPassForm.controls['confirmPassword'].setValue('12345');
    component.forgotPassForm.controls['code'].setValue('681379');
    expect(component.forgotPassForm.valid).toBeTruthy();
    spyOn(component, 'submit')
    element = fixture.debugElement.query(By.css('credix-button')).nativeElement;
    element.click();
    tick();
    fixture.detectChanges();
    expect(component.submitted).toBeTruthy();
  }));

});
