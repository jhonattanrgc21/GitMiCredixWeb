import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal-info-editor',
  templateUrl: './personal-info-editor.component.html',
  styleUrls: ['./personal-info-editor.component.scss']
})
export class PersonalInfoEditorComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/home/personal-info']);
  }

  edit() {

  }

}
