import { newSpecPage } from '@stencil/core/testing';
import { GuxPaginationCursor } from '../gux-pagination-cursor';

const components = [GuxPaginationCursor];
const language = 'en';

describe('gux-pagination-cursor-beta', () => {
  describe('#render', () => {
    [
      '<gux-pagination-cursor-beta></gux-pagination-cursor-beta>',
      '<gux-pagination-cursor-beta has-next></gux-pagination-cursor-beta>',
      '<gux-pagination-cursor-beta has-previous has-next></gux-pagination-cursor-beta>',
      '<gux-pagination-cursor-beta has-previous></gux-pagination-cursor-beta>'
    ].forEach((html, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationCursor);
        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('guxPaginationCursorchange', () => {
    it('should fire guxPaginationCursorchange(previous) event when enabled previous button is clicked', async () => {
      const html =
        '<gux-pagination-cursor-beta has-previous></gux-pagination-cursor-beta>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const [previousButton, nextButton] = Array.from(
        element.shadowRoot.querySelectorAll('button')
      ) as HTMLElement[];
      const guxPaginationCursorchangeSpy = jest.fn();

      page.win.addEventListener(
        'guxPaginationCursorchange',
        guxPaginationCursorchangeSpy
      );

      previousButton.click();
      await page.waitForChanges();

      expect(guxPaginationCursorchangeSpy).toHaveBeenCalledWith(
        expect.objectContaining({ detail: 'previous' })
      );
    });

    it('should fire guxPaginationCursorchange(next) event when enabled next button is clicked', async () => {
      const html =
        '<gux-pagination-cursor-beta has-next></gux-pagination-cursor-beta>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const [previousButton, nextButton] = Array.from(
        element.shadowRoot.querySelectorAll('button')
      ) as HTMLElement[];
      const guxPaginationCursorchangeSpy = jest.fn();

      page.win.addEventListener(
        'guxPaginationCursorchange',
        guxPaginationCursorchangeSpy
      );

      nextButton.click();
      await page.waitForChanges();

      expect(guxPaginationCursorchangeSpy).toHaveBeenCalledWith(
        expect.objectContaining({ detail: 'next' })
      );
    });

    it('should not fire guxPaginationCursorchange(previous) event when disabled previous button is clicked', async () => {
      const html = '<gux-pagination-cursor-beta></gux-pagination-cursor-beta>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const [previousButton, nextButton] = Array.from(
        element.shadowRoot.querySelectorAll('button')
      ) as HTMLElement[];
      const guxPaginationCursorchangeSpy = jest.fn();

      page.win.addEventListener(
        'guxPaginationCursorchange',
        guxPaginationCursorchangeSpy
      );

      previousButton.click();
      await page.waitForChanges();

      expect(guxPaginationCursorchangeSpy).not.toHaveBeenCalled();
    });

    it('should not fire guxPaginationCursorchange(next) event when disabled next button is clicked', async () => {
      const html = '<gux-pagination-cursor-beta></gux-pagination-cursor-beta>';
      const page = await newSpecPage({ components, html, language });
      const element = page.root as HTMLElement;
      const [previousButton, nextButton] = Array.from(
        element.shadowRoot.querySelectorAll('button')
      ) as HTMLElement[];
      const guxPaginationCursorchangeSpy = jest.fn();

      page.win.addEventListener(
        'guxPaginationCursorchange',
        guxPaginationCursorchangeSpy
      );

      nextButton.click();
      await page.waitForChanges();

      expect(guxPaginationCursorchangeSpy).not.toHaveBeenCalled();
    });
  });
});
