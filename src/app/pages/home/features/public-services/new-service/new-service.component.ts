import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {PublicServicesApiService} from '../../../../../core/services/public-services-api.service';
import {PublicServicesService} from '../public-services.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss']
})
export class NewServiceComponent implements OnInit {
  consultFormGroup: FormGroup = new FormGroup({
    contract: new FormControl(null, [Validators.required])
  });
  confirmFormGroup: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required])
  });
  stepperIndex = 0;
  disableButton = true;
  done = false;
  publicServiceId: number;
  referenceName: string;
  title: string;
  message: string;
  status: string;
  @ViewChild('newServiceStepper') stepper: CdkStepper;

  constructor(private publicServicesService: PublicServicesService,
              private publicServicesApiService: PublicServicesApiService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.publicServiceId = +params.serviceId;
      this.getEnterprise(+params.categoryId, +params.enterpriseId);
      this.publicServicesService.getReferenceName(+params.categoryId).subscribe(referenceName => this.referenceName = referenceName);
    });
  }

  getEnterprise(categoryId: number, enterpriseId: number) {
    this.publicServicesApiService.getPublicServiceEnterpriseByCategory(categoryId).subscribe(publicServiceEnterprises =>
      this.title = publicServiceEnterprises
        .find(enterprise => enterprise.publicServiceEnterpriseId === enterpriseId).publicServiceEnterpriseDescription);
  }

  openModal() {

  }

  back() {
    this.stepperIndex === 0 ? this.router.navigate(['/home/public-services']) : this.stepper.previous();
    this.stepperIndex = this.stepper.selectedIndex;
  }

  continue() {
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex;
  }
}
