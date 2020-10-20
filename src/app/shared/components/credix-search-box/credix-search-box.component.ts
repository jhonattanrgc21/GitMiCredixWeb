import { Component, Input, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-search-box',
  templateUrl: './credix-search-box.component.html',
  styleUrls: ['./credix-search-box.component.scss']
})
export class CredixSearchBoxComponent implements OnInit {
  @Input() initialObject: any;
  @Output() returnResponse: EventEmitter<any> = new EventEmitter<any>();
  searchPanelStyle: boolean = false;
  inputControl = new FormControl();
  searchingResult: any = [];

  constructor() {

  }

  ngOnInit(): void {
    this.onInputChanged();
  }

  @HostListener('focusout')
  onFocusout() {
    setTimeout(() => {
      this.searchPanelStyle = false;
      this.inputControl.reset();
    }, 300);
  }

  onClickItem(item: any) {
    this.returnResponse.emit(item);
  }

  onInputChanged() {
    this.inputControl.valueChanges.subscribe(value => {
      setTimeout(() => {
        if (value) {
          this.searchPanelStyle = false;
          const input = value.toLowerCase();
          this.searchingResult = this.initialObject.filter(element => {
            return (element.title.toLowerCase().includes(input) || element.description.toLowerCase().includes(input));
          });
          if (this.searchingResult.length > 0) {
            this.searchPanelStyle = true;
          }
        } else {
          this.searchPanelStyle = false;
        }
      }, 300);
    });
  }

}
