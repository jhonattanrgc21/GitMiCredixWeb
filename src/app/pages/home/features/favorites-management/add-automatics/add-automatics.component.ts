import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-automatics',
  templateUrl: './add-automatics.component.html',
  styleUrls: ['./add-automatics.component.scss']
})
export class AddAutomaticsComponent implements OnInit {

  newAutomaticsForm: FormGroup = new FormGroup({
    codeCredix: new FormControl(null, [Validators.required])
  });

  constructor() {
  }

  ngOnInit(): void {
  }

}
