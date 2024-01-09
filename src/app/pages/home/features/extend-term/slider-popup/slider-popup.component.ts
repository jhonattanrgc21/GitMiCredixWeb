import { style } from "@angular/animations";
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-slider-popup",
  templateUrl: "./slider-popup.component.html",
  styleUrls: ["./slider-popup.component.scss"],
})
export class SliderPopupComponent implements OnInit {
  constructor() {}

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
}
