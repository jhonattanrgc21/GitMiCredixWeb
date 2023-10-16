import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TagsService } from 'src/app/core/services/tags.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-information-popup',
  templateUrl: './information-popup.component.html',
  styleUrls: ['./information-popup.component.scss']
})
export class InformationPopupComponent implements OnInit {

  info1: string;
  info2: string;
  info3: string;
  bottom: string;
  option1: string;
  option2: string;

  constructor(private tagsService: TagsService, public dialogRef: MatDialogRef<InformationPopupComponent>) { }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Programar cuotas').tags));
  }

  getTags(tags: Tag[]) {
    this.info1 = tags.find(tag => tag.description === 'programarcuotas.info1')?.value;
    this.option1 = tags.find(tag => tag.description === 'programarcuotas.option1')?.value;
    this.option2 = tags.find(tag => tag.description === 'programarcuotas.option2')?.value;
    this.info2 = tags.find(tag => tag.description === 'programarcuotas.info2')?.value;
    this.bottom = tags.find(tag => tag.description === 'programarcuotas.botton')?.value;
  }

    submit() {
      this.dialogRef.close();
  }
}
