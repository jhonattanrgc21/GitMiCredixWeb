import {TemplateRef} from '@angular/core';

export class ToastData {
  type: ToastType = 'info';
  text?: string;
  template?: TemplateRef<any>;
}

export type ToastType = 'warning' | 'error' | 'success' | 'info';
