import { Component, OnInit } from "@angular/core";
import { ModalService } from "src/app/core/services/modal.service";
import { RuleInfoPopupComponent } from "../rule-info-popup/rule-info-popup.component";
import { Router } from "@angular/router";
import { CredixMasService } from "../credix-mas.service";
import { AccountInfo } from "src/app/shared/models/credix-mas-info";

@Component({
  selector: "app-credix-mas-success-screen",
  templateUrl: "./credix-mas-success-screen.component.html",
  styleUrls: ["./credix-mas-success-screen.component.scss"],
})
export class CredixMasSuccessScreenComponent implements OnInit {
  status: "success" | "info" | "error" = "success";
  view: "success" | "warning" | "error" = "success";
  result = {
    title: "¡Exito!",
    message:
      "¡Se suscribió exitosamente! Se activarán los beneficios en máximo 48 horas hábiles. Puede darle seguimiento en la sección de Mi Cuenta.",
  };
  today = new Date();
  chargeDate: number;
  info: AccountInfo = {} as AccountInfo;
  constructor(
    private modalService: ModalService,
    private router: Router,
    private credixMasService: CredixMasService
  ) {}

  ngOnInit(): void {
    this.info = this.credixMasService._info;
    this.status = this.credixMasService.response.type;
    this.result = {
      title: this.credixMasService.response.title,
      message: this.credixMasService.response.message,
    };
    this.view =
      this.status === "success"
        ? this.result.title === "¡Lo sentimos!"
          ? "warning"
          : this.status
        : this.status;
    if (this.view == "success") {
      let date = new Date();
      let result = date.setDate(date.getDate() + 2);
      this.chargeDate = new Date(result).getDate();
    }
  }

  showRuleInfo() {
    if (this.status === "success" && this.credixMasService._info.rules > 0) {
      this.modalService.open(
        { data: {}, hideCloseButton: true, component: RuleInfoPopupComponent },
        { width: 343, disableClose: false },
        1
      );
    }
  }
}
