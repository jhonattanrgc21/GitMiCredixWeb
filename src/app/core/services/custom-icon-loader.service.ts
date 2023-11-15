import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Injectable} from '@angular/core';
import {icons} from '../constants/icons';

@Injectable()
export class CustomIconLoaderService {
  icons = icons;
  iconUrl = 'assets/images/icons';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
  }

  public registerIcons(): void {
    this.icons.forEach(key => {
      console.log(key);
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.iconUrl}/${key}.svg`));
    });
  }

}
