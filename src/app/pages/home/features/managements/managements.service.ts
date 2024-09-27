import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { StorageService } from '../../../../core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementsService {
  private readonly userManagementAll = '/usermanagement/all';
  private readonly userManagementCosts = '/usermanagement/costs';
  private readonly userManagementDetails = '/usermanagement/details';
  private readonly userManagementStatusChange = '/usermanagement/statuschange';
  private readonly userManagementTypeManagement = '/usermanagement/typemanagement';

  constructor(private httpService: HttpService, private storageService: StorageService) {}

  getManagementList(page: number = 0) {
    return this.httpService.post('canales', this.userManagementAll, {
      accountNumber: this.storageService.getCurrentUser().accountNumber,
      page
    });
  }

  getManagementCosts() {
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
}

