import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { RuleInfoPopupComponent } from '../rule-info-popup/rule-info-popup.component';
import { Router } from '@angular/router';
import { CredixMasService } from '../credix-mas.service';

@Component({
  selector: 'app-credix-mas-success-screen',
  templateUrl: './credix-mas-success-screen.component.html',
  styleUrls: ['./credix-mas-success-screen.component.scss']
})
export class CredixMasSuccessScreenComponent implements OnInit {

  status: 'success' | 'info' | 'error' = 'success';
  result = {title: '¡Exito!',message: '¡Se suscribió exitosamente! Se activarán los beneficios en máximo 48 horas hábiles. Puede darle seguimiento en la sección de Mi Cuenta.'}
  constructor(private modalService: ModalService, private router: Router, private credixMasService: CredixMasService) { }

  ngOnInit(): void {
    // console.log(this.credixMasService.subscription)
  }

  showRuleInfo(){
    this.modalService
      .open(
        { data: {
            // no
          }, hideCloseButton: true, component: RuleInfoPopupComponent},
        {width: 343, disableClose: false}, 1);
  }

}
