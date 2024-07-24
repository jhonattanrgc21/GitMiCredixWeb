import { QuotaStrongPipe } from './quota-strong.pipe';

describe('QuotaStrongPipe', () => {
  it('create an instance', () => {
    const pipe = new QuotaStrongPipe();
    expect(pipe).toBeTruthy();
  });
});
