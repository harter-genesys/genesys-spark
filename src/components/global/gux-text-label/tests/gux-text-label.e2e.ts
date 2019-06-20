import { newE2EPage } from '@stencil/core/testing';

describe('gux-text-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-text-label></gux-text-label>');
    const element = await page.find('gux-text-label');
    expect(element).toHaveClass('hydrated');
  });

  it('uses the correct label when simple label value provided', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-text-label label="Test Item"></gux-text-label>'
    );
    const element = await page.find('gux-text-label label');
    expect(element).toEqualText('Test Item');
  });

  it('uses the correct label when slotted label provided', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<gux-text-label>
        <div slot="label">Test Item</div>
      </gux-text-label>`
    );
    const element = await page.find('gux-text-label label');
    expect(element).toEqualText('Test Item');
  });

  it('provides an aria-label to labeled content', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-text-label label="Test Item"><gux-text-field></gux-text-field></gux-text-label>'
    );
    const element = await page.find('gux-text-label gux-text-field');
    const label = element.getAttribute('sr-label');
    expect(label).toEqual('Test Item');
  });
});
