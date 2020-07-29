import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-marchamos',
  templateUrl: './marchamos.component.html',
  styleUrls: ['./marchamos.component.scss']
})
export class MarchamosComponent implements OnInit {

  consultForm: FormGroup = new FormGroup({
    VehicleType: new FormControl('',[Validators.required]),
    plateNumber: new FormControl('',[Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

}
