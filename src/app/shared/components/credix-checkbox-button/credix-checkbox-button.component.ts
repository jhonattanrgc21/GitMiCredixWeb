import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "credix-checkbox-button",
  templateUrl: "./credix-checkbox-button.component.html",
  styleUrls: ["./credix-checkbox-button.component.scss"],
})
export class CredixCheckboxButtonComponent implements OnInit {
  @Input() label = "";
  @Input() checked: boolean;
  @Input() value;
  @Input() disable: boolean;
  @Output() emitCheckBox = new EventEmitter();
  @ViewChild(MatCheckbox) checkbox!: MatCheckbox;

  constructor() {}

  ngOnInit(): void {}

  triggerCheckboxClick(): void {
    this.checkbox._inputElement.nativeElement.click();
  }

  isCheckedValue(event) {
    this.checked = event.checked;
    this.emitCheckBox.emit({
      checked: event.checked,
      value: event.source.value,
    });
  }
}
