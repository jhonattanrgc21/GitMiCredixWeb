import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-search-box',
  templateUrl: './credix-search-box.component.html',
  styleUrls: ['./credix-search-box.component.scss']
})
export class CredixSearchBoxComponent implements OnInit {
  @Input()
  initialObject: any;

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
      PRINCIPAL: 'search_panel_disactive',
      ACTIVE: 'search_panel'
    }
  };

  searchBoxStyle: string = 'search_box';
  searchInputStyle: string = 'search_input_text';
  searchPanelStyle: string = 'search_panel_disactive';

  inputValue: any = '';
  searchObject: any = [];

  constructor() {

  }

  ngOnInit(): void {
    
  }

  inputTextChanged() {
    setTimeout(() => {
      if (this.inputValue) {
        this.searchBoxStyle = this.COMPONENT_CLASSES.SEARCH_BOX.ACTIVE;
        this.searchInputStyle = this.COMPONENT_CLASSES.SEARCH_INPUT_TEXT.ACTIVE;
        this.searchPanelStyle = this.COMPONENT_CLASSES.SEARCH_PANEL.PRINCIPAL;
        let input = this.inputValue.toLowerCase();
        this.searchObject = this.initialObject.filter(element => {
          return (element.title.toLowerCase().includes(input) || element.description.toLowerCase().includes(input)) ? true : false;
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
  }

}