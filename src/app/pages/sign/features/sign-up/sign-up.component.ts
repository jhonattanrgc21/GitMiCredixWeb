import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @ViewChild('templateModalSignUp') templateModalSignUp: TemplateRef<any>;

  constructor(private modalService: ModalService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openSignUpModal(){
    this.modalService.open({template: this.templateModalSignUp, title:'Bienvenido a mi Credix'});
  }

}
