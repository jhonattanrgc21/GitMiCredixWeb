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
  currencyForm: FormGroup = new FormGroup({
    colones: new FormControl(null),
    dollars: new FormControl(null),
  });

  ruleForm: FormGroup = new FormGroup({
    colones: new FormGroup({
      minimumAmount: new FormControl('', [Validators.required]),
      maximumAmount: new FormControl('', [Validators.required]),
      quotas:  new FormControl('', [Validators.required]),
      commissions: new FormControl('', [Validators.required]),
      interest:  new FormControl('', [Validators.required]),
      initDate:  new FormControl('', [Validators.required]),
      endDate:  new FormControl('', [Validators.required]),
    }),
    dollars: new FormGroup({
      minimumAmount: new FormControl('', [Validators.required]),
      maximumAmount: new FormControl('', [Validators.required]),
      quotas:  new FormControl('', [Validators.required]),
      commissions: new FormControl('', [Validators.required]),
      interest:  new FormControl('', [Validators.required]),
      initDate:  new FormControl('', [Validators.required]),
      endDate:  new FormControl('', [Validators.required]),
    }),
  });

  summaryForm: FormGroup = new FormGroup({
  });


  isColones: boolean = false;
  isDollars: boolean = false;
  selectedIndex = 0;
  disableButton = false;
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


  setEnableButton() {
    switch (this.selectedIndex) {
      case 0:
        this.disableButton = true
        this.currencyForm.valueChanges.subscribe((obj) => {
          if(!obj.colones && !obj.dollars) this.disableButton = true;
          else this.disableButton = false;
        });
        break;
      case 1:
        this.disableButton = this.ruleForm.invalid;
        this.ruleForm.valueChanges.subscribe(() => {
          this.disableButton = this.ruleForm.invalid;
        });
        break;
      case 2:
        this.disableButton = this.summaryForm.invalid;
        this.summaryForm.valueChanges.subscribe(() => {
          this.disableButton = this.summaryForm.invalid;
        });
        break;
    }
  }

  next() {
    if (this.selectedIndex < 3) {
      this.stepper.next();
      this.selectedIndex++;
      this.disableButton = false;
    }

    if (this.selectedIndex === 2) {
      this.summaryForm.controls.code.reset(null, [Validators.required]);
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
