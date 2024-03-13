import { Component, OnInit } from '@angular/core';
import { CredixMasService } from './credix-mas.service';
import { TagsService } from 'src/app/core/services/tags.service';

@Component({
  selector: 'app-credix-mas',
  templateUrl: './credix-mas.component.html',
  styleUrls: ['./credix-mas.component.scss']
})
export class CredixMasComponent implements OnInit {
  loading = true;
  constructor(private credixMasService: CredixMasService, private tagsService: TagsService) { }

  ngOnInit(): void {
    this.credixMasService.getAccountInfo().subscribe((value) => {
      this.tagsService
      .getAllFunctionalitiesAndTags()
      .subscribe((functionality) => {
        this.credixMasService.setTags(functionality.find(
            (fun) => fun.description === "Suscripción Credix Más"
          ).tags);
        this.loading = false;
      });

    })
  }

}
