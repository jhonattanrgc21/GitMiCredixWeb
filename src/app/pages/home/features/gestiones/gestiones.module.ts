import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionesMainPageComponent } from './gestiones.component';
import { RouterModule, Routes } from '@angular/router';
import { GestionAumentarLimitePageComponent } from './aumentar-limite/aumentar-limite.component';
import { GestionPinTarjetasPageComponent } from './pin-tarjetas/pin-tarjetas.component';
import { GestionRenovacionPageComponent } from './renovacion/renovacion.component';
import { GestionRoboExtravioPageComponent } from './robo-extravio/robo-extravio.component';
import { GestionTarjetaDanadaPageComponent } from './tarjeta-danada/tarjeta-danada.component';
import { AgregarNuevaGestionPageComponent } from './agregar-nueva-gestion/agregar-nueva-gestion.component';
import { CredixButtonModule } from 'src/app/shared/components/credix-button/credix-button.module';
import { MisGestionesPageComponent } from './mis-gestiones/mis-gestiones.component';
import { CredixNavigationTableModule } from 'src/app/shared/components/credix-navigation-table/credix-navigation-table.module';

const routes: Routes = [
  {
    path: '',
    component: GestionesMainPageComponent,
    children: [
      {
        path: 'mis-gestiones',
        component: MisGestionesPageComponent
      },
      {
        path: 'agregar-nueva-gestion',
        component: AgregarNuevaGestionPageComponent,
      },
      {
        path: 'robo-o-extravio',
        component: GestionRoboExtravioPageComponent,
      },
      {
        path: 'renovar-tarjetas',
        component: GestionRenovacionPageComponent
      },
      {
        path: 'tarjeta-danada',
        component: GestionTarjetaDanadaPageComponent
      },
      {
        path: 'pin-de-tarjetas',
        component: GestionPinTarjetasPageComponent
      },
      {
        path: 'aumentar-limite',
        component: GestionAumentarLimitePageComponent
      },
      {
        path: '**',
        redirectTo: 'mis-gestiones'
      }
    ]
  }
]


@NgModule({
  declarations: [
    GestionesMainPageComponent,
    GestionAumentarLimitePageComponent,
    GestionPinTarjetasPageComponent,
    GestionRenovacionPageComponent,
    GestionRoboExtravioPageComponent,
    GestionTarjetaDanadaPageComponent,
    AgregarNuevaGestionPageComponent,
    MisGestionesPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CredixButtonModule,
    CredixNavigationTableModule
  ],
  exports: [],
  providers: [],
})
export class MisGestionesModule {}
