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
  COMPONENT_CLASSES: any = {
    SEARCH_BOX: {
      PRINCIPAL: 'search_box',
      ACTIVE: 'search_box_active'
    },
    SEARCH_INPUT_TEXT: {
      PRINCIPAL: 'search_input_text',
      ACTIVE: 'search_input_text_active'
    },
    SEARCH_PANEL: {
      PRINCIPAL: 'search_panel_inactive',
      ACTIVE: 'search_panel'
    }
  };
  searchBoxStyle = 'search_box';
  searchInputStyle = 'search_input_text';
  searchPanelStyle = 'search_panel_inactive';
  inputControl = new FormControl();
  searchObject: any = [];

  constructor() {

  }

  ngOnInit(): void {
    this.onInputChanged();
  }

  @HostListener('focusout')
  onFocusout() {
    setTimeout(() => {
      this.searchBoxStyle = this.COMPONENT_CLASSES.SEARCH_BOX.PRINCIPAL;
      this.searchInputStyle = this.COMPONENT_CLASSES.SEARCH_INPUT_TEXT.PRINCIPAL;
      this.searchPanelStyle = this.COMPONENT_CLASSES.SEARCH_PANEL.PRINCIPAL;
      this.inputControl.reset();
    }, 300);
  }

  onClickItem(item: any){
    this.returnResponse.emit(item);
  }

  onInputChanged() {
    this.inputControl.valueChanges.subscribe(value => {
      setTimeout(() => {
        if (value) {
          this.searchBoxStyle = this.COMPONENT_CLASSES.SEARCH_BOX.ACTIVE;
          this.searchInputStyle = this.COMPONENT_CLASSES.SEARCH_INPUT_TEXT.ACTIVE;
          this.searchPanelStyle = this.COMPONENT_CLASSES.SEARCH_PANEL.PRINCIPAL;
          const input = value.toLowerCase();
          this.searchObject = this.initialObject.filter(element => {
            return (element.title.toLowerCase().includes(input) || element.description.toLowerCase().includes(input));
          });
          if (this.searchObject.length > 0) {
            this.searchPanelStyle = this.COMPONENT_CLASSES.SEARCH_PANEL.ACTIVE;
          }
        } else {
          this.searchBoxStyle = this.COMPONENT_CLASSES.SEARCH_BOX.PRINCIPAL;
          this.searchInputStyle = this.COMPONENT_CLASSES.SEARCH_INPUT_TEXT.PRINCIPAL;
          this.searchPanelStyle = this.COMPONENT_CLASSES.SEARCH_PANEL.PRINCIPAL;
        }
      }, 300);
    });
  }

}
