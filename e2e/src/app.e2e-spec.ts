import {AppPage} from './app.po';
import {browser, logging} from 'protractor';


describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.driver.manage().window().setSize(1280, 1024);
  });

  it('should display welcome message', () => {
    page.navigateTo('sign/forgot-pass');
    expect(page.getTitleText('h2')).toEqual('Olvidó contraseña');
  });

  it('form should be invalid when password dont match', () => {
    page.navigateTo('sign/forgot-pass');
    page.getElementByCss('credix-button').click();

    let select = page.getElementByCss('mat-select');
    select.click();
    page.getElementByCss('#mat-option-1').click();
    page.getElementByName('identNumber').sendKeys(114140321);
    page.getElementByName('password').sendKeys('K123456a.');
    page.getElementByName('confirmPassword').sendKeys('K123546a');
    page.getElementByCss('credix-code-input').sendKeys('681379');
    let form = page.getElementByCss('form');
    expect(form.valid).toBeFalsy();
  });

  it('submit when valid', () => {
    page.navigateTo('sign/forgot-pass');
    page.getElementByCss('credix-button').click();

    let select = page.getElementByCss('mat-select');
    select.click();
    page.getElementByCss('#mat-option-1').click();
    page.getElementByName('identNumber').sendKeys(114140321);
    page.getElementByName('password').sendKeys('K123456a');
    page.getElementByName('confirmPassword').sendKeys('K123456a');
    page.getElementByCss('credix-code-input').sendKeys('681379');
    let form = page.getElementByCss('form');
    expect(form.valid).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
