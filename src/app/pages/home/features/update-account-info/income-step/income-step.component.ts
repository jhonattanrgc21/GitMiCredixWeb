import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalApiService } from 'src/app/core/services/global-api.service';
import { ApplicantIncome } from 'src/app/shared/models/applicant-data';
import { IncomeType } from 'src/app/shared/models/income-type';
import { Occupation } from 'src/app/shared/models/occupation';

@Component({
  selector: 'income-step-component',
  templateUrl: './income-step.component.html',
  styleUrls: ['./income-step.component.scss']
})
export class IncomeStepComponent implements OnInit, OnChanges {
  @Input() currentIncomeData: ApplicantIncome;
  @Input() IncomeStepFormGroup: FormGroup = this.fb.group({
    incomeType: [1, Validators.required]
  })

  salariedIncomeFormGroup = this.fb.group({
    employerName: ['', [Validators.required]],
    netIncome: ['', [Validators.required]],
    profession: [0, [Validators.required]],
    jobPosition: [0, [Validators.required]],
    laborYears: [0, Validators.required]
  })

  independentIncomeFormGroup = this.fb.group({
    profession: [0, Validators.required],
    incomeSource: ['', Validators.required],
    economicActivity: [0, Validators.required],

    provinceId: [0, Validators.required],
    cantonId: [0, Validators.required],
    districtId: [0, Validators.required],

    address: ['', Validators.required],
    monthlyIncome: ['', Validators.required],

    laborYears: [0, Validators.required]
  })

  pensionerIncomeFormGroup = this.fb.group({
    netIncome: [0, [Validators.required]]
  })

  professions: Occupation[] = []
  incomeTypes: IncomeType[] = []

  incomeTypeSelected: number;

  incomeDocumentsUploaded = []

  constructor(private globalApiService: GlobalApiService, private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.currentIncomeData && changes.currentIncomeData.currentValue) {
      this.loadFormData()
    }

  }

  ngOnInit(): void {

    this.getProffesions()

    this.globalApiService.getIncomeTypes().subscribe((incomeTypes) => {
      this.incomeTypes = incomeTypes
    })

    this.IncomeStepFormGroup.controls.incomeType.valueChanges.subscribe(value => {
      this.incomeTypeSelected = value
    })

    this.IncomeStepFormGroup.controls.incomeType.updateValueAndValidity()

  }

  loadFormData() {
    let incomeData = this.currentIncomeData
    switch (incomeData.incomeOriginId) {

      case 1:
        this.salariedIncomeFormGroup.setValue({
          employerName: incomeData.employerName,
          netIncome: incomeData.netIncome,
          profession: incomeData.profession,
          jobPosition: incomeData.jobPosition,
          laborYears: incomeData.laborYears
        })
        break;
      case 2:
        this.independentIncomeFormGroup.setValue({
          profession: incomeData.profession,
          incomeSource: incomeData.incomeSource,
          economicActivity: incomeData.economicActivity,

          provinceId: incomeData.provinceId,
          cantonId: incomeData.cantonId,
          districtId: incomeData.districtId,

          address: incomeData.address,
          monthlyIncome: incomeData.monthlyIncome,

          laborYears: incomeData.laborYears
        })
        break;
      case 3:
        this.pensionerIncomeFormGroup.setValue({
          netIncome: incomeData.netIncome
        })
        break;

    }
  }

  getProffesions() {
    this.globalApiService.getOccupations().subscribe((value) => {
      this.professions = value
    })
  }

  imageUploaded(imageData){
    this.incomeDocumentsUploaded.push(imageData)
  }

}
