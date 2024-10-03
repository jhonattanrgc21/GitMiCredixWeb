import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { StorageService } from '../../../../core/services/storage.service';
import { Observable, of } from 'rxjs';
import { UserManagementCosts } from 'src/app/shared/models/managements/costs';
import { PhoneMaskPipe } from '../../../../shared/pipes/phone-mask/phone-mask.pipe';
import { DeliveryInfo } from 'src/app/shared/components/credix-delivery-options/interfaces/delivery-options.interface';
import { CardReplacementData } from 'src/app/shared/models/cards/card-service';
import { CardService } from '../../../../core/services/card.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementsService {
  private readonly userManagementAll = '/usermanagement/all';
  private readonly userManagementCosts = '/usermanagement/costs';
  private readonly userManagementDetails = '/usermanagement/details';
  private readonly userManagementStatusChange = '/usermanagement/statuschange';
  private readonly userManagementTypeManagement = '/usermanagement/typemanagement';

  constructor(private httpService: HttpService, private storageService: StorageService, private phoneMaskPipe: PhoneMaskPipe, private cardService: CardService) {}

  getManagementList(page: number = 0) {
    return this.httpService.post('canales', this.userManagementAll, {
      accountNumber: this.storageService.getCurrentUser().accountNumber,
      page
    });
  }

  getManagementCosts(): Observable<UserManagementCosts> {
    return this.httpService.post('canales', this.userManagementCosts, {
      management:"replaceCard"
    });
  }

  getManagementDetails(managementNumber: number) {
    return this.httpService.post('canales', this.userManagementDetails, {
      managementNumber
    });
  }

  getManagementStatusChange() {
    return this.httpService.post('canales', this.userManagementStatusChange, {
      accountNumber: this.storageService.getCurrentUser().accountNumber,
    });
  }

  getManagementTypeManagement() {
    return this.httpService.post('canales', this.userManagementTypeManagement, {
      accountNumber: this.storageService.getCurrentUser().accountNumber,
    });
  }

  postCardReplacement(reason: string, lostDocuments: boolean, cardsId: number[], deliveryInfo: DeliveryInfo): Observable<any> {

    let cardReplacementData: CardReplacementData = {
      cardId: cardsId,
      reason,
      lostDocuments,
      deliveryPlace: deliveryInfo.type,
    }

    switch (deliveryInfo.type) {
      case 1:
        cardReplacementData.addressId = deliveryInfo.deliveryPlace.id
        break;
      case 2:
        switch (deliveryInfo.homeDeliveryOption) {
          case 1:

            cardReplacementData.addressId = deliveryInfo.addressInfo.addressId
            cardReplacementData.receiverName = deliveryInfo.addressInfo.name
            cardReplacementData.receiverPhone = this.phoneMaskPipe.transform(deliveryInfo.addressInfo.phone, false)
            break;

          case 2:

            cardReplacementData.receiverDistrict = deliveryInfo.addressInfo.district
            cardReplacementData.receiverCanton = deliveryInfo.addressInfo.canton
            cardReplacementData.receiverProvince = deliveryInfo.addressInfo.province
            cardReplacementData.receiverAddress = deliveryInfo.addressInfo.address
            cardReplacementData.receiverName = deliveryInfo.addressInfo.name
            cardReplacementData.receiverPhone = this.phoneMaskPipe.transform(deliveryInfo.addressInfo.phone, false)

            break;
        }
        break;
    }

    return this.cardService.postCardReplacement(cardReplacementData)

  }
}

