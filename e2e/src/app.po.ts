import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo(path: string): Promise<unknown> {
    return browser.get(browser.baseUrl + path) as Promise<unknown>;
  }

  getTitleText(el: string): Promise<string> {
    return element(by.css(el)).getText() as Promise<string>;
  }

  getElementByCss(el: string) {
    return element(by.css(el));
  }

  getElementByName(el: string) {
    return element(by.name(el));
  }
}
