import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'emailMask'
})
export class EmailMaskPipe implements PipeTransform {

  transform(email: string): string {

    if (!email) {
      return '';
    }

    if (email.split('@').length < 2) {
      return email;
    }

    const prefix = email.split('@')[0];
    const suffix = email.split('@')[1];
    let prefixMasked = prefix.charAt(0);

    for (let i = 1; i < prefix.length - 1; i++) {
      prefixMasked = prefixMasked + '*';
    }

    return `${prefixMasked}${prefix.charAt(prefix.length - 1)}@${suffix}`;
  }

}
