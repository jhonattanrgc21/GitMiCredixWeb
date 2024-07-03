import { Component, OnInit } from "@angular/core";
import { CredixMasService } from "../credix-mas.service";
import { Tag } from "src/app/shared/models/tag";

@Component({
  selector: "app-credix-mas-info",
  templateUrl: "./credix-mas-info.component.html",
  styleUrls: ["./credix-mas-info.component.scss"],
})
export class CredixMasInfoComponent implements OnInit {
  subscription = false;
  benefits: { id: number; icon: string; description: string }[] = [];
  notification: { title: string; message: string; type: string };

  constructor(private credixMasService: CredixMasService) {}

  ngOnInit(): void {
    this.benefits = this.credixMasService
      .getBenefits()
      .map((el) => {
        let id = Number(el.description.charAt(el.description.length - 1));
        let description = el.value.split("/")[0];
        let icon = el.value.split("/")[1].replace(/\s/g, "");
        return { id, icon, description };
      })
      .sort((a, b) => a.id - b.id);
    this.subscription = this.credixMasService.subscription;
    this.notification = this.credixMasService.notification;
  }
}
