import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { VehicleType } from 'src/app/shared/models/vehicleType.models';
import { CdkStepper } from '@angular/cdk/stepper';
import { HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupMarchamosDetailComponent } from './popup-marchamos-detail/popup-marchamos-detail.component';

@Component({
  selector: 'app-marchamos',
  templateUrl: './marchamos.component.html',
  styleUrls: ['./marchamos.component.scss']
})
export class MarchamosComponent implements OnInit {

  vehicleType: VehicleType[] = [
    {
      description: "ALAJUELA BUS",
      type: 1
    },
    {
      description: "ALAJUELA PUBLICO",
      type: 2
    },
    {
      description: "BICIMOTOS",
      type: 3
    },
    {
      description: "CARGA PESADA",
      type: 4
    },
    {
      description: "CARTAGO BUS",
      type: 5
    },
    {
      description: "CARGA LIVIANA",
      type: 6
    },
    {
      description: "CARTAGO PUBLICO",
      type: 7
    },
    {
      description: "CRUZ ROJA COSTARRICENSE",
      type: 8
    },
    {
      description: "DISCAPACITADO",
      type: 9
    },
    {
      description: "EQUIPO ESPECIAL",
      type: 10
    },
    {
      description: "EXPORTACION",
      type: 11
    },
    {
      description: "GUANACASTE BUS",
      type: 12
    },
    {
      description: "GUANACASTE PUBLICO",
      type: 13
    },
    {
      description: "HEREDIA BUS",
      type: 14
    },
    {
      description: "HEREDIA PUBLICO",
      type: 15
    },
    {
      description: "LIMON BUS",
      type: 16
    },
    {
      description: "LIMITACIONES FISICAS PERMANENTES",
      type: 17
    },
    {
      description: "LIMON PUBLICO",
      type: 18
    },
    {
      description: "MUDIAL DE FUTBOL FEMENINO 2014",
      type: 19
    },
    {
      description: "MOTOS",
      type: 20
    },
    {
      description: "PARTICULAR",
      type: 21
    },
    {
      description: "PUNTARENAS BUS",
      type: 22
    },
    {
      description: "PENSIONADO",
      type: 23
    },
    {
      description: "PUNTARENAS PUBLICO",
      type: 24
    },
    {
      description: "SAN JOSE BUS",
      type: 25
    },
    {
      description: "SAN JOSE PUBLICO",
      type: 26
    },
    {
      description: "TAXI ALAJUELA",
      type: 27
    },
    {
      description: "AEROPUERTO INTERNACIONAL JUAN SANTAMARIA",
      type: 28
    },
    {
      description: "PERMISO DE TAXI",
      type: 29
    },
    {
      description: "TAXI CARTAGO",
      type: 30
    },
    {
      description: "TAXI GUANACASTE",
      type: 31
    },
    {
      description: "TAXI HEREDIA",
      type: 32
    },
    {
      description: "TAXI LIMON",
      type: 33
    },
    {
      description: "TAXI PUNTARENAS",
      type: 34
    },
    {
      description: "TAXI SAN JOSE",
      type: 35
    },
    {
      description: "TURISMO",
      type: 36
    },
    {
      description: "CLASE TEMPORAL PARA EL PERIODO 2016",
      type: 37
    },
    {
      description: "CLASE TEMPORAL PARA EL PERIODO 2017",
      type: 38
    },
    {
      description: "CLASE TEMPORAL PARA EL PERIODO 2018",
      type: 39
    },
    {
      description: "EMBAJADA DE ESTADOS UNIDOS",
      type: 40
    },
    {
      description: "VEHICULO ESPECIAL",
      type: 41
    },
    {
      description: "VEHICULO HISTORICO",
      type: 42
    },
    {
      description: "ZONAS FRANCAS DE EXPORTACION",
      type: 43
    }
  ];
  vehicleInformation: boolean;
  totalMount: string = '₡ 114.996,00';
  value: number = 1;
  popupShowDetail: MatDialogRef<PopupMarchamosDetailComponent>;


  consultForm: FormGroup = new FormGroup({
    VehicleType: new FormControl('',[Validators.required]),
    plateNumber: new FormControl('',[Validators.required])
  });

  secureAndCoutesForm: FormGroup = new FormGroup({
    responsabilityCivil: new FormControl('',[]),

  });


  @ViewChild('stepper') stepper: CdkStepper;

  constructor(
    private httpService: HttpService,
    private modalService: ModalService
    ) { }

  ngOnInit(): void {
    this.getVehicleType();
  }

  consult(): boolean{
    return this.vehicleInformation = true;
  }

  continue(){
    this.stepper.next();
  }

  getVehicleType(){
    this.httpService.post('marchamos', 'pay/platetypes', {channelId: 102}).subscribe( response => console.log(response));
  }

  showDetail(data?:any){
     this.popupShowDetail =  this.modalService.open({
          component: PopupMarchamosDetailComponent, 
          hideCloseButton: true, 
          data: data
        }, {width: 376, height: 368, disableClose: true});
        this.popupShowDetail.afterClosed();
        // .subscribe(modal => this.responseResult.message = modal.message);
      }
  }
