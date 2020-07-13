import {Component, OnInit} from '@angular/core';
import {icons} from '../../../../core/icons';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  icons = icons;

  constructor() {
  }

  ngOnInit(): void {
  }

}
