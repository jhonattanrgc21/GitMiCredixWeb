import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { PublicServicesApiService } from 'src/app/core/services/public-services-api.service';
import {Keys} from '../../../../../../../shared/models/keys';
import { PublicServicesService } from '../../../public-services.service';

@Component({
  selector: 'app-new-service-first-step',
  templateUrl: './new-service-first-step.component.html',
  styleUrls: ['./new-service-first-step.component.scss']
})
export class NewServiceFirstStepComponent implements OnInit, OnChanges {
  @Input() contractFormGroup = new FormGroup({
    contractControl: new FormControl(null, [Validators.required]),
    keysControl: new FormControl(null, [Validators.required])
  });
  @Input() hasReceipts = true;
  @Input() message: string;
  @Input() keys: Keys[];
  @Input() quantityOfKeys: number;
  label = 'contrato';

  constructor(
    private publicServiceService: PublicServicesService,
    private publicServiceApiService: PublicServicesApiService,
  ) {
  }

  ngOnInit(): void {
    this.getLabel();
    this.getReferenceNumber();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.keys) {
      if (this.keys?.length === 1) {
        this.contractFormGroup.controls.keysControl.setValue(this.keys[0].keyType);
        this.label = this.keys[0].description;
        this.publicServiceService.publicServiceReference = this.keys[0].keyType;
      }
    }
  }

  getLabel() {
    this.contractFormGroup.controls.keysControl.valueChanges.subscribe(value => {
      this.label = this.keys.find(key => key.keyType === value).description;
      this.publicServiceService.publicServiceReference = this.keys.find(key => key.keyType === value).keyType;
    });
  }

  getReferenceNumber() {
    this.contractFormGroup.controls.contractControl.valueChanges.subscribe(value => {
      this.publicServiceService.publicServiceReferenceNumber = value;
    });
  }
}
