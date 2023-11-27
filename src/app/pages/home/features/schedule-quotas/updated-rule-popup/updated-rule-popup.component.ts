import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TagsService } from 'src/app/core/services/tags.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-updated-rule-popup',
  templateUrl: './updated-rule-popup.component.html',
  styleUrls: ['./updated-rule-popup.component.scss']
})
export class UpdatedRulePopupComponent implements OnInit {

  title: string;
  info: string;
  button1: string;
  button2: string;

  constructor(private tagsService: TagsService,private router: Router,public dialogRef: MatDialogRef<UpdatedRulePopupComponent>) { }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Programar cuotas').tags));
  }

  getTags(tags: Tag[]) {
    this.title = tags.find(tag => tag.description === 'programarcuotas.updatedRule.title')?.value;
    this.info = tags.find(tag => tag.description === 'programarcuotas.updatedRule.information')?.value;
    this.button1 = tags.find(tag => tag.description === 'programarcuotas.updatedRule.button1')?.value;
    this.button2 = tags.find(tag => tag.description === 'programarcuotas.updatedRule.button2')?.value;
  }

  redirectToScheduleQuotas(){
    this.router.navigate(['/home/schedule-quotas']);
    this.submit();
  }

  submit() {
    this.dialogRef.close();
  }
}
