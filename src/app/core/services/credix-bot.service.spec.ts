import {TestBed} from '@angular/core/testing';

import {CredixBotService} from './credix-bot.service';

describe('CredixBotService', () => {
  let service: CredixBotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredixBotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
