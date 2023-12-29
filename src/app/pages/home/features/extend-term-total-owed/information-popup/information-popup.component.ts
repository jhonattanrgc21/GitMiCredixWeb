import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TagsService } from 'src/app/core/services/tags.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-information-popup',
  templateUrl: './information-popup.component.html',
  styleUrls: ['./information-popup.component.scss']
})
export class InformationPopupComponent implements OnInit {

  title: string;
  info: string;
  button1: string;
  button2: string;

  constructor(private tagsService: TagsService, private router: Router, public dialogRef: MatDialogRef<InformationPopupComponent>) { }

  ngOnInit(): void {
    this.title = 'Importante';
    this.info = 'Al solicitar el plan con el plazo seleccionado, temporalmente no podrá usar su tarjeta. Si lo desea, realice los pagos necesarios para liberar su disponible y disfrutar de sus beneficios.';
    this.button1 = 'Solicitar plan';
    this.button2 = 'Modificar plazo';
    // this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
    //   this.getTags(functionality.find(fun => fun.description === 'Programar cuotas').tags));
  }

  getTags(tags: Tag[]) {
    this.title = tags.find(tag => tag.description === 'programarcuotas.updatedRule.title')?.value;
    this.info = tags.find(tag => tag.description === 'programarcuotas.updatedRule.information')?.value;
    this.button1 = tags.find(tag => tag.description === 'programarcuotas.updatedRule.button1')?.value;
    this.button2 = tags.find(tag => tag.description === 'programarcuotas.updatedRule.button2')?.value;
  }

  submit() {
    this.dialogRef.close(
      {
        isReady: true
      } as any
    );
  }
}
