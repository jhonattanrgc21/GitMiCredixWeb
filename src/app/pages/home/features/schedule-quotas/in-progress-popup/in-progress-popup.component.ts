import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TagsService } from 'src/app/core/services/tags.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-in-progress-popup',
  templateUrl: './in-progress-popup.component.html',
  styleUrls: ['./in-progress-popup.component.scss']
})
export class InProgressPopupComponent implements OnInit {

  info: string;
  info2: string;
  bottom: string;
  valueStatus: number;


  constructor(private tagsService: TagsService, public dialogRef: MatDialogRef<InProgressPopupComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Programar cuotas').tags));
      this.valueStatus = this.data.data?.valueStatus;
  }

  getTags(tags: Tag[]) {
    this.info = tags.find(tag => tag.description === 'programarcuotas.inprogress.text')?.value;
    this.info2 = tags.find(tag => tag.description === 'programarcuotas.inprogress.text2')?.value;
    this.bottom = tags.find(tag => tag.description === 'programarcuotas.inprogress.botton')?.value;
  }

  submit() {
    this.dialogRef.close();
  }
}
