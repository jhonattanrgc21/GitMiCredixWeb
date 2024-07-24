import { Component, OnInit } from "@angular/core";
import { Tag } from "../../../../../shared/models/tag";
import { TagsService } from "../../../../../core/services/tags.service";
import { ExtendTermService } from "../extend-term.service";
import { Router } from "@angular/router";
import { PreviousMovements } from "../../../../../shared/models/previous-purchase";
import { ModalService } from "src/app/core/services/modal.service";
import { ReminderPopupComponent } from "./reminder-popup/reminder-popup.component";

@Component({
  selector: "app-extend-term-previous-success",
  templateUrl: "./extend-term-previous-success.component.html",
  styleUrls: ["./extend-term-previous-success.component.scss"],
})
export class ExtendTermPreviousSuccessComponent implements OnInit {
  status: any;
  message: string;
  establishment: string;
  currency: string;
  amount: string;
  quota: number;
  titleTag: string;
  newQuotaTag: string;
  dateTag: string;
  title: string;
  today = new Date();
  amountSummary = "0";
  pagoContadoColones: string;
  previousMovementSelected: PreviousMovements[] = [];
  endDate: Date;

  constructor(
    private extendTermService: ExtendTermService,
    private tagsService: TagsService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    if (!this.extendTermService.result?.status) {
      this.router.navigate(["/home/extend-term"]);
    }

    this.currency = this.extendTermService.newQuota?.currency;
    this.amount = this.extendTermService.newQuota?.amount;
    this.quota = this.extendTermService.newQuota?.quota;
    this.status = this.extendTermService.result.status;
    this.title = this.extendTermService.result.title;
    this.message = this.extendTermService.result.message;
    this.amountSummary = this.extendTermService.amountSummary;
    this.pagoContadoColones = this.extendTermService.pagoContadoColones;
    this.endDate = this.extendTermService.endDate;
    this.previousMovementSelected = this.extendTermService.movementsSelectedArr;
    this.tagsService
      .getAllFunctionalitiesAndTags()
      .subscribe((functionality) =>
        this.getTags(
          functionality.find(
            (fun) => fun.description === "Ampliar plazo de compra"
          ).tags
        )
      );
  }

  getTags(tags: Tag[]) {
    this.dateTag = tags.find(
      (tag) => tag.description === "ampliar.result.fecha"
    )?.value;
    this.newQuotaTag = tags.find(
      (tag) => tag.description === "ampliar.tag.nuevacuota"
    )?.value;
    this.titleTag = tags.find(
      (tag) => tag.description === "ampliar.title"
    )?.value;
  }

  showReminder() {
    if (this.status === "success") {
      this.modalService
        .open(
          {
            title: "Recordatorio",
            hideCloseButton: false,
            component: ReminderPopupComponent,
            data: {},
          },
          { disableClose: true, height: 260, width: 343, panelClass: "info" },
          1
        )
        .afterClosed();
    }
  }
}
