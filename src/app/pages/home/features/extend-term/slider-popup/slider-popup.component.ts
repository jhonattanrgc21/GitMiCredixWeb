import { style } from "@angular/animations";
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EventEmitter } from "protractor";
import { Subject } from "rxjs";

@Component({
  selector: "app-slider-popup",
  templateUrl: "./slider-popup.component.html",
  styleUrls: ["./slider-popup.component.scss"],
})
export class SliderPopupComponent implements AfterViewInit {

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

  ngAfterViewInit(): void {
    this.scrollContent.nativeElement.style.maxHeight =
      this.slide1.nativeElement.offsetHeight + "px";
  }

  @ViewChild("scrollContent", { read: ElementRef }) scrollContent!: ElementRef;
  @ViewChild("controls", { read: ElementRef }) controls!: ElementRef;
  @ViewChild("slide1", { read: ElementRef }) slide1!: ElementRef;
  @ViewChild("slide2", { read: ElementRef }) slide2!: ElementRef;

  selectedSlide = 1;

  scrollLeft() {
    this.scrollContent.nativeElement.scrollTo({
      left: this.scrollContent.nativeElement.scrollLeft - 1000,
      behavior: "smooth",
    });
    this.selectedSlide = 1;
    this.scrollContent.nativeElement.style.maxHeight =
      this.slide1.nativeElement.offsetHeight + "px";
  }

  scrollRight() {
    this.scrollContent.nativeElement.scrollTo({
      left: this.scrollContent.nativeElement.scrollLeft + 1000,
      behavior: "smooth",
    });
    this.selectedSlide = 2;
    this.scrollContent.nativeElement.style.maxHeight = "100%";
  }

  close() {
    this.dialogRef.close();
  }

}
