import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'quotaStrong'
})
export class QuotaStrongPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string, phraseToBold: string): SafeHtml {
    if (!value || !phraseToBold) {
      return value;
    }

    const regex = new RegExp(phraseToBold , 'gi');
    const newValue =
       value.replace(regex, `<b>${phraseToBold}</b>`);
    return this.sanitizer.bypassSecurityTrustHtml(newValue);
  }

}
