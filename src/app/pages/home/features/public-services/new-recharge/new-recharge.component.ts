import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PendingReceipts} from '../../../../../shared/models/pending-receipts';
import {finalize} from 'rxjs/operators';
import {PublicServicesService} from '../public-services.service';
import {PublicServicesApiService} from '../../../../../core/services/public-services-api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../../core/services/modal.service';
import {Keys} from '../../../../../shared/models/keys';
import {CdkStepper} from '@angular/cdk/stepper';
import {PopupReceiptComponent} from '../popup-receipt/popup-receipt.component';
import {PopupReceipt} from '../../../../../shared/models/popup-receipt';
import {CredixCodeErrorService} from '../../../../../core/services/credix-code-error.service';

@Component({
    selector: 'app-new-recharge',
    templateUrl: './new-recharge.component.html',
    styleUrls: ['./new-recharge.component.scss']
})
export class NewRechargeComponent implements OnInit {
    phoneNumber: FormControl = new FormControl(null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
    rechargeFormGroup: FormGroup = new FormGroup({
        amount: new FormControl(null, [Validators.required]),
        credixCode: new FormControl(null, [Validators.required]),
        favorite: new FormControl(null),
    });
    amounts: { amount: string, id: number }[] = [
        {id: 1, amount: '1.000,00'},
        {id: 1, amount: '2.000,00'},
        {id: 1, amount: '5.000,00'},
        {id: 1, amount: '10.000,00'},
        {id: 1, amount: 'Otro'}
    ];
    stepperIndex = 0;
    dataToModal: PopupReceipt;
    currencySymbol = '₡';
    saveAsFavorite = false;
    done = false;
    hasReceipts = true;
    pendingReceipts: PendingReceipts;
    publicServiceId: number;
    name: string;
    title: string;
    message: string;
    status: 'success' | 'error';
    keys: Keys[];
    today = new Date();
    @ViewChild('newRechargeStepper') stepper: CdkStepper;

    constructor(private publicServicesService: PublicServicesService,
                private publicServicesApiService: PublicServicesApiService,
                private router: Router,
                private modalService: ModalService,
                private credixCodeErrorService: CredixCodeErrorService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getMinAmounts();
        this.setErrorCredixCode();
        this.getRouteParams();
    }

    getRouteParams() {
        this.route.params.subscribe(params => {
            this.publicServiceId = +params.serviceId;
            this.getEnterprise(+params.categoryId, +params.enterpriseId);
            this.getPublicService(+params.enterpriseId, this.publicServiceId);
        });
    }

    getEnterprise(categoryId: number, enterpriseId: number) {
        this.publicServicesApiService.getPublicServiceEnterpriseByCategory(categoryId).subscribe(publicServiceEnterprises =>
            this.title = publicServiceEnterprises
                .find(enterprise => enterprise.publicServiceEnterpriseId === enterpriseId).publicServiceEnterpriseDescription);
    }

    getPublicService(enterpriseId: number, publicServiceId: number) {
        this.publicServicesApiService.getPublicServiceByEnterprise(enterpriseId).subscribe(publicService => {
            this.keys = publicService.find(elem => elem.publicServiceId === publicServiceId).keys;
        });
    }

    getMinAmounts() {
        this.publicServicesService.getMinAmounts().subscribe(amounts => this.amounts = [...amounts, {id: 10, amount: 'Otro'}]);
    }

    openModal() {
        this.modalService.confirmationPopup('¿Desea realizar esta recarga?').subscribe(confirmation => {
            if (confirmation) {
                this.recharge();
            }
        });
    }

    recharge() {
        const receipt = this.pendingReceipts.receipts;
        this.publicServicesService.payPublicService(
            this.publicServiceId,
            +receipt.serviceValue,
            this.rechargeFormGroup.controls.amount.value,
            +receipt.receiptPeriod,
            this.keys[0].keyType,
            receipt.expirationDate,
            receipt.billNumber)
            .pipe(finalize(() => this.done = true))
            .subscribe(response => {
                this.status = response.type;
                this.message = response.responseDescription || response.message;

                if (response.type === 'success' && this.saveAsFavorite) {
                    this.saveFavorite();
                }

                this.dataToModal = {
                    institution: [{companyCode: response.companyCode, companyName: response.companyName}],
                    agreement: [{contractCode: response.contractCode, contractName: response.contractName}],
                    agencyCode: response.agencyCode,
                    cashier: 'Credix',
                    currencyCode: this.pendingReceipts.currencyCode,
                    clientName: this.pendingReceipts.clientName,
                    billNumber: this.pendingReceipts.receipts.billNumber,
                    invoiceNumber: this.pendingReceipts.receipts.receipt,
                    paymentStatus: 'Aplicado',
                    movementDate: this.pendingReceipts.date,
                    expirationDate: this.pendingReceipts.receipts.expirationDate,
                    period: this.pendingReceipts.receipts.receiptPeriod,
                    reference: response.reference,
                    typeOfValor: 'EFECTIVO',
                    amount: response.amountPaid,
                    paymentConcepts: response.paymentConcepts,
                    informativeConcepts: response.informativeConcepts,
                    currencySymbol: this.currencySymbol
                };
            });
    }

    saveFavorite() {
        this.publicServicesService.savePublicServiceFavorite(
            this.publicServiceId,
            this.rechargeFormGroup.controls.phoneNumber.value,
            this.rechargeFormGroup.controls.favorite.value,
            this.rechargeFormGroup.controls.credixCode.value).subscribe();
    }

    back() {
        this.stepperIndex === 0 ? this.router.navigate(['/home/public-services']) : this.stepper.previous();
        this.stepperIndex = this.stepper.selectedIndex;
    }

    continue() {
        this.stepper.next();
        this.stepperIndex = this.stepper.selectedIndex;
    }

    checkPendingReceipts() {
        this.publicServicesService.checkPendingReceipts(this.publicServiceId, this.phoneNumber.value, this.keys[0].keyType)
            .subscribe(pendingReceipts => {
                if (pendingReceipts?.receipts) {
                    this.pendingReceipts = pendingReceipts;
                    this.continue();
                } else {
                    this.hasReceipts = false;
                }
            });
    }

    setErrorCredixCode() {
        this.credixCodeErrorService.credixCodeError$.subscribe(() => {
            this.rechargeFormGroup.controls.credixCode.setErrors({invalid: true});
            this.rechargeFormGroup.updateValueAndValidity();
        });
    }

    openBillingModal() {
        this.modalService.open({title: 'Comprobante', data: this.dataToModal, component: PopupReceiptComponent},
            {height: 673, width: 380, disableClose: false});
    }
}
