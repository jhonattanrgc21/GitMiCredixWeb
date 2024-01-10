import { style } from "@angular/animations";
import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-slider-popup",
  templateUrl: "./slider-popup.component.html",
  styleUrls: ["./slider-popup.component.scss"],
})
export class SliderPopupComponent implements OnInit {

  credixMasTitle: string;
  credixMasText: string;
  promoMessage: string;
  promoDescription: string;

  constructor(public dialogRef: MatDialogRef<SliderPopupComponent>, @Inject(MAT_DIALOG_DATA) public dataModal) {
    const { data } = dataModal;
    const {credixMasTitle, credixMasText, promoMessage, promoDescription} = data;
    this.credixMasTitle = credixMasTitle;
    this.credixMasText = credixMasText;
    this.promoDescription = promoDescription;
    this.promoMessage = promoMessage;
  }

  ngOnInit(): void {}

  @ViewChild("scrollContent", { read: ElementRef }) scrollContent!: ElementRef;
  @ViewChild("controls", { read: ElementRef }) controls!: ElementRef;

  selectedSlide = 1;

  scrollLeft() {
    this.scrollContent.nativeElement.scrollTo({
      left: this.scrollContent.nativeElement.scrollLeft - 1000,
      behavior: "smooth",
    });
    this.selectedSlide = 1;
  }

  scrollRight() {
    this.scrollContent.nativeElement.scrollTo({
      left: this.scrollContent.nativeElement.scrollLeft + 1000,
      behavior: "smooth",
    });
    this.selectedSlide = 2;
  }

  close(){
    this.dialogRef.close();
  }
}
