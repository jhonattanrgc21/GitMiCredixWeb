import {Component} from '@angular/core';
import {CustomIconLoaderService} from './core/services/custom-icon-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Credix Template';

  constructor(customIconLoaderService: CustomIconLoaderService) {
    customIconLoaderService.registerIcons();
  }

}
