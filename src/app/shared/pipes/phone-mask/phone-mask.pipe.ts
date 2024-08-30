import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phoneMask'
})
export class PhoneMaskPipe implements PipeTransform {

  transform(phone: string | number, hide = true): string {

    if (!phone) {
      return '';
    }

    if (phone.toString().includes('*')) {
      return phone.toString();
    }

    if (phone.toString().length < 8) {
      return phone.toString();
    }

    const prefix = phone.toString().substring(0, 4);
    const suffix = phone.toString().substring(4, 8);

    return hide ? `${prefix.charAt(0)}${prefix.charAt(1)}**-**${suffix.charAt(2)}${suffix.charAt(3)}` : `${prefix}-${suffix}`;
  }

}
