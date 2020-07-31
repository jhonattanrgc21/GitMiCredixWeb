import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-awards',
  templateUrl: './modal-awards.component.html',
  styleUrls: ['./modal-awards.component.scss']
})
export class ModalAwardsComponent implements OnInit {
  template1 = true;
  template2 = false;
  template3 = false;
  pag = "1 de 3";
  leftPag = true;
  rightPag = false;

  constructor() { }

  ngOnInit(): void {
  }

  next(){
    if(this.pag == "1 de 3"){
      this.template1 = false;
      this.template2 = true;
      this.pag = "2 de 3";
      this.leftPag = false;
    } else if(this.pag == "2 de 3"){
      this.template2 = false;
      this.template3 = true;
      this.pag = "3 de 3"
      this.rightPag = true;
    }
  }
  back(){
    if(this.pag == "2 de 3"){
      this.template2 = false;
      this.template1 = true;
      this.pag = "1 de 3";
      this.leftPag = true;
    } else if(this.pag == "3 de 3"){
      this.template3 = false;
      this.template2 = true;
      this.pag = "2 de 3"
      this.rightPag = false;
    }
  }

}
