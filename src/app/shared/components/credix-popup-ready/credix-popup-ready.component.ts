import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-credix-popup-ready",
  templateUrl: "./credix-popup-ready.component.html",
  styleUrls: ["./credix-popup-ready.component.scss"],
})
export class CredixPopupReadyComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CredixPopupReadyComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {}
}
