import { RxjsChatLicePage } from './app.po';

describe('rxjs-chat-lice App', () => {
  let page: RxjsChatLicePage;

  beforeEach(() => {
    page = new RxjsChatLicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
