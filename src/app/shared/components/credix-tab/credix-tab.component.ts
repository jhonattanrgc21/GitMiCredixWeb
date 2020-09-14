import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

const INIT_OFFSET = 0;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-tab',
  templateUrl: './credix-tab.component.html',
  styleUrls: ['./credix-tab.component.scss']
})
export class CredixTabComponent implements OnInit, OnChanges {
  @Input() tabs: Tab[];
  @Output() selectionEvent: EventEmitter<Tab> = new EventEmitter<Tab>();
  activeTab = '';
  activeIndex = 0;
  previousIndex = 0;
  currentOffset = 0;
  displacement = 0;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.activeTab = this.tabs[0]?.name;
    this.displacement = INIT_OFFSET;
    this.currentOffset = INIT_OFFSET;
  }

  isTabSelected(tab: Tab, index: number, offsetLeft: number) {
    this.selectionEvent.emit(tab);
    this.activeTab = tab.name;
    if (this.activeIndex !== index) {
      const offset = offsetLeft === 0 ? offsetLeft : offsetLeft - 5;
      this.displacement = offset - this.currentOffset + this.displacement;
      this.previousIndex = this.activeIndex;
      this.activeIndex = index;
      this.currentOffset = offset;
    }
  }

}

interface Tab {
  id: number;
  name: string;
}
