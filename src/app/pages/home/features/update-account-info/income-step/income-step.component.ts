import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalApiService } from 'src/app/core/services/global-api.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ApplicantIncome } from 'src/app/shared/models/applicant-data';
import { Canton } from 'src/app/shared/models/canton';
import { District } from 'src/app/shared/models/district';
import { IncomeType } from 'src/app/shared/models/income-type';
import { Occupation } from 'src/app/shared/models/occupation';
import { Province } from 'src/app/shared/models/province';

@Component({
  selector: 'income-step-component',
  templateUrl: './income-step.component.html',
  styleUrls: ['./income-step.component.scss']
})
export class IncomeStepComponent implements OnInit, OnChanges {
  @ViewChild('documentUploadInfoModal') documentUploadInfoModal: TemplateRef<any>
  documentUploadInfoDialogRef: MatDialogRef<any>

  @Input() currentIncomeData: ApplicantIncome;
  @Input() IncomeStepFormGroup: FormGroup = this.fb.group({
    incomeType: [1, Validators.required]
  })

  provinces: Province[] = [];
  cantons: Canton[] = [];
  districts: District[] = [];

  salariedIncomeFormGroup = this.fb.group({
    employerName: ['', [Validators.required]],
    netIncome: ['', [Validators.required]],
    profession: [0, [Validators.required]],
    jobPosition: ['', [Validators.required]],
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

  constructor(private globalApiService: GlobalApiService, private fb: FormBuilder, private modalService: ModalService) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.currentIncomeData && changes.currentIncomeData.currentValue) {
      this.loadFormData()
    }

  }

  ngOnInit(): void {
    this.getProvinces();
    this.onProvinceChanged();
    this.onCantonChanged();

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

  getProvinces() {
    this.globalApiService.getProvinces().subscribe(provinces => this.provinces = provinces);
  }

  onProvinceChanged() {
    this.independentIncomeFormGroup.controls.provinceId.valueChanges.subscribe(value => {
      this.districts = [];
      this.cantons = [];
      this.independentIncomeFormGroup.controls.districtId.reset(null, { onlySelf: true, emitEvent: false });
      this.independentIncomeFormGroup.controls.cantonId.reset(null, { onlySelf: true, emitEvent: false });
      this.getCantons(value);
    });
  }

  getCantons(provinceId: number) {
    this.globalApiService.getCantons(provinceId)
      .subscribe(cantons => this.cantons = cantons);
  }

  onCantonChanged() {
    this.independentIncomeFormGroup.controls.cantonId.valueChanges.subscribe(value => {
      this.districts = [];
      this.independentIncomeFormGroup.controls.districtId.reset(null, { onlySelf: true, emitEvent: false });
      this.getDistricts(value);
    });
  }

  getDistricts(cantonId: number) {
    this.globalApiService.getDistricts(cantonId).subscribe(districts => this.districts = districts);
  }

  imageUploaded(imageData) {
    this.incomeDocumentsUploaded.push(imageData)
  }

  removeDocumentFromList(index: number) {
    this.incomeDocumentsUploaded.splice(index, 1)
  }

  showDocumentUploadInfoModal() {
    this.documentUploadInfoDialogRef = this.modalService.open({
      template: this.documentUploadInfoModal,
      title: null,
      hideCloseButton: true
    }, { width: 343, disableClose: false, panelClass: 'document-upload-info-modal' })
  }

  closeDocumentUploadInfoModal() {
    if (!this.documentUploadInfoDialogRef) return

    this.documentUploadInfoDialogRef.close()
  }

}
