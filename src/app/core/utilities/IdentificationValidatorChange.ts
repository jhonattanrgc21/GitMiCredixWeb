import { AbstractControl } from '@angular/forms';


export interface identificationMask{ mask:string, maxLength: number};

export const identificationTypeChanged = (typeIdentification: AbstractControl, identification:AbstractControl) => {
  let identificationMask:identificationMask;

  typeIdentification.valueChanges.subscribe(value => {
    if (value !== null) {
      identification.reset(null, {emitEvent: false});
      identification.enable();
    } else {
      identification.disable();
    }

    switch (value) {
      case 'CN': {
       return identificationMask = {mask:'0-0000-0000', maxLength: 9};
       break;
      }
       case 'CJ': {
        return identificationMask = {mask:'0-000-000000', maxLength: 10};
        break;
      }
      case 'CR': {
        return identificationMask = {mask:'000000000000', maxLength: 12};
        break;
      }
      case 'PE': {
        return identificationMask = {mask:'000000000000', maxLength: 12};
        break;
      }
    }
  });
};


