import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credix-mas-success-screen',
  templateUrl: './credix-mas-success-screen.component.html',
  styleUrls: ['./credix-mas-success-screen.component.scss']
})
export class CredixMasSuccessScreenComponent implements OnInit {

  status: 'success' | 'info' | 'error' = 'success';
  result = {title: '¡Exito!',message: '¡Se suscribió exitosamente! Se activarán los beneficios en máximo 48 horas hábiles. Puede darle seguimiento en la sección de Mi Cuenta.'}
  constructor() { }

  ngOnInit(): void {
  }

}
