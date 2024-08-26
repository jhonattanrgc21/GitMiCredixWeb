import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-managements-component',
  templateUrl: './my-managements.component.html',
  styleUrls: ['./my-managements.component.scss']
})
export class MyManagementsPageComponent implements OnInit {
  STATUSES = {
    [1]: 'En Proceso',
    [2]: 'En Espera',
    [3]: 'Finalizada'
  }

  MANAGEMENT_TYPES = {
    [1]: 'Robo o extravio',
    [2]: 'Renovar Tarjeta',
    [3]: 'Tarjeta dañada',
    [4]: 'Pin de tarjetas',
    [5]: 'Aumentar limite de credito'
  }

  managements = [
    {
      id: 12345678,
      type: 1,
      status: 1,
      requestedDate: '23 Feb 22',
      endDate: null
    },
    {
      id: 12345679,
      type: 2,
      status: 1,
      requestedDate: '27 Feb 22',
      endDate: null
    },
    {
      id: 12345680,
      type: 3,
      status: 3,
      requestedDate: '01 Mar 22',
      endDate: '03 Mar 22'
    },
    {
      id: 12345681,
      type: 4,
      status: 2,
      requestedDate: '02 Mar 22',
      endDate: null
    },
    {
      id: 12345682,
      type: 5,
      status: 3,
      requestedDate: '01 Mar 22',
      endDate: '05 Mar 22'
    }
  ]

  managementToDisplay: any;

  constructor() { }

  ngOnInit(): void { }

  displayDetails(index: number) {
    this.managementToDisplay = this.managements[index]
  }
}
