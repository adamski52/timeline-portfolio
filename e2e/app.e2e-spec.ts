import { Jna2017Page } from './app.po';

describe('jna2017 App', () => {
  let page: Jna2017Page;

  beforeEach(() => {
    page = new Jna2017Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
