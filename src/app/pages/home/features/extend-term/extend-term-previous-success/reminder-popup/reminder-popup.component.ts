import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-reminder-popup",
  templateUrl: "./reminder-popup.component.html",
  styleUrls: ["./reminder-popup.component.scss"],
})
export class ReminderPopupComponent {
  info =
    "En 3 días hábiles se reflejará el monto ampliado en su pago de contado. A su correo le enviamos los detalles en caso de que no desee pagar intereses corrientes.";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ReminderPopupComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
