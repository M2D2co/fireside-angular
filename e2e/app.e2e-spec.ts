import { AppPage } from './app.po';

describe('Fireside Chat', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    page.navigateTo();
    const text = await page.getParagraphText();
    expect(text).toEqual('Welcome to app!');
  });
});
