import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-credix-code',
  templateUrl: './credix-code.component.html',
  styleUrls: ['./credix-code.component.scss']
})
export class CredixCodeComponent implements OnInit {
  firstCodeFormControl = new FormControl(null, [Validators.required]);
  secondCodeFormControl = new FormControl({value: '', disabled: true}, [Validators.required]);

  constructor() {
  }

  ngOnInit(): void {
  }

}
