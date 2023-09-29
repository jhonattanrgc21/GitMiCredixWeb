import { CdkStepper } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ScheduleQuotasService } from './schedule-quotas.service';
import { CredixCodeErrorService } from 'src/app/core/services/credix-code-error.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-quotas',
  templateUrl: './schedule-quotas.component.html',
  styleUrls: ['./schedule-quotas.component.scss'],
  providers: [DatePipe]
})
export class ScheduleQuotasComponent implements OnInit, AfterViewInit {
  currencyForm: FormGroup;
  ruleForm: FormGroup;

  // Esto debe recuperarse de Backend
  currencyList: any[] = [
    {
      code: 188,
      description: 'Colones',
      isSelected: false,
    },
    {
      code: 840,
      description: 'Dólares',
      isSelected: false,
    }
  ]

  isColones: boolean = false;
  isDollars: boolean = false;
  selectedIndex = 0;
  disableButton = true;
  done = false;
  message: string;
  status: 'success' | 'error';
  title: string;
  step: string;
  step2: string;
  step3: string;
  todayString: string;
  rulesList: any[] = [];
  isActiveStepper: boolean = false;
  @ViewChild('scheduleQuotasStepper') stepper: CdkStepper;

  constructor(private scheduleQuotasService: ScheduleQuotasService,
    private credixCodeErrorService: CredixCodeErrorService,
    private modalService: ModalService,
    private tagsService: TagsService,
    private router: Router,
    private datePipe: DatePipe) {
    this.todayString = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.currencyForm = new FormGroup({
      colones: new FormControl(null),
      dollars: new FormControl(null),
    });

    this.ruleForm = new FormGroup({
      colones: new FormGroup({
        minimumAmount: new FormControl(''),
        maximumAmount: new FormControl(''),
        quotas:  new FormControl(''),
        commissions: new FormControl(''),
        interest:  new FormControl(''),
        initDate:  new FormControl(''),
        endDate:  new FormControl(''),
      }),
      dollars: new FormGroup({
        minimumAmount: new FormControl(''),
        maximumAmount: new FormControl(''),
        quotas:  new FormControl(''),
        commissions: new FormControl(''),
        interest:  new FormControl(''),
        initDate:  new FormControl(''),
        endDate:  new FormControl(''),
      }),
    });

  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setEnableButton();
  }

  setIsColones(value: boolean){
    this.isColones = value;
  }
  setIsDollars(value: boolean){
    this.isDollars = value;
  }

  existRules():boolean{
    return this.rulesList.length > 0;
  }

  activeStepper(value: boolean){
    this.isActiveStepper = value;
  }

  addValidationToForm(fieldName: string, isActive: boolean){
    if(isActive){
      this.ruleForm.get(fieldName).get('minimumAmount').setValidators(Validators.required);
      this.ruleForm.get(fieldName).get('maximumAmount').setValidators(Validators.required);
      this.ruleForm.get(fieldName).get('quotas').setValidators(Validators.required);
      this.ruleForm.get(fieldName).get('commissions').setValidators(Validators.required);
      this.ruleForm.get(fieldName).get('interest').setValidators(Validators.required);
      this.ruleForm.get(fieldName).get('initDate').setValidators(Validators.required);
      this.ruleForm.get(fieldName).get('endDate').setValidators(Validators.required);
    }
    else{
      this.ruleForm.get(fieldName).get('minimumAmount').clearValidators();
      this.ruleForm.get(fieldName).get('maximumAmount').clearValidators();
      this.ruleForm.get(fieldName).get('quotas').clearValidators();
      this.ruleForm.get(fieldName).get('commissions').clearValidators();
      this.ruleForm.get(fieldName).get('interest').clearValidators();
      this.ruleForm.get(fieldName).get('initDate').clearValidators();
      this.ruleForm.get(fieldName).get('endDate').clearValidators();
    }
  }

  setEnableButton() {
    switch (this.selectedIndex) {
      case 0:
        if(this.isColones || this.isDollars) this.disableButton = false;
        this.currencyForm.valueChanges.subscribe((obj) => {
          if(!obj.colones && !obj.dollars) this.disableButton = true;
          else this.disableButton = false;
        });
        break;
      case 1:
        this.addValidationToForm('coolones', this.isColones);
        this.addValidationToForm('dollars', this.isDollars);
        this.disableButton = this.ruleForm.invalid;
        this.disableButton = false;
        this.ruleForm.valueChanges.subscribe((form) => {
          this.disableButton = this.ruleForm.invalid;
        });
        break;
      case 2:
        this.disableButton = false;
        break;
    }
  }

  next() {
    if (this.selectedIndex < 3) {
      this.stepper.next();
      this.selectedIndex = this.stepper.selectedIndex;
      this.disableButton = false;
    }

    if (this.selectedIndex === 3) {
      //this.openConfirmationModal();
    }

    this.setEnableButton();
  }

  back() {
    this.selectedIndex--;
    this.stepper.previous();
    this.setEnableButton();
  }

}
