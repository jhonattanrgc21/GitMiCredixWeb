import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { CredixPopupReadyComponent } from "./credix-popup-ready.component";

@NgModule({
  declarations: [CredixPopupReadyComponent],
  exports: [CredixPopupReadyComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
  ],
})
export class CredixPopupReadyModule {}
