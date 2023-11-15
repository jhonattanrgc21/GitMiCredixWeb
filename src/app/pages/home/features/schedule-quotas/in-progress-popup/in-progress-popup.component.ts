import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TagsService } from 'src/app/core/services/tags.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-in-progress-popup',
  templateUrl: './in-progress-popup.component.html',
  styleUrls: ['./in-progress-popup.component.scss']
})
export class InProgressPopupComponent implements OnInit {

  info: string;
  bottom: string;

  constructor(private tagsService: TagsService, public dialogRef: MatDialogRef<InProgressPopupComponent>) { }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Programar cuotas').tags));
  }

  getTags(tags: Tag[]) {
    this.info = tags.find(tag => tag.description === 'programarcuotas.inprogress.text')?.value;
    this.bottom = tags.find(tag => tag.description === 'programarcuotas.inprogress.botton')?.value;
  }

  submit() {
    this.dialogRef.close();
  }
}
