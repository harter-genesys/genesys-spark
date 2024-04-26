import { newSpecPage } from '@test/specTestUtils';

import { GuxFormFieldRadioGroupBeta } from '../gux-form-field-radio-group';

const components = [GuxFormFieldRadioGroupBeta];
const language = 'en';

describe('gux-form-field-radio-beta', () => {
  it('should build', async () => {
    const html = `
      <gux-form-field-radio-group-beta>
        <label slot="group-label">Food</label>
        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio>
      </gux-form-field-radio-group-beta>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldRadioGroupBeta);
  });

  describe('#render', () => {
    [
      `
      <gux-form-field-radio-group-beta>
        <label slot="group-label">Food</label>

        <gux-form-field-radio>
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio>
      </gux-form-field-radio-group-beta>
      // `
      // `
      //   <gux-form-field-radio>
      //     <input slot="input" type="radio" name="food-1" value="pizza" disabled/>
      //     <label slot="label">Pizza</label>
      //   </gux-form-field-radio>
      // `,
      // `
      //   <gux-form-field-radio>
      //     <input slot="input" type="radio" name="food-1" value="pizza"/>
      //     <label slot="label">Pizza</label>
      //     <span slot="error">This is an error message</span>
      //   </gux-form-field-radio>
      // `,
      // `
      //   <gux-form-field-radio>
      //     <input slot="input" type="radio" name="food-1" value="pizza" checked/>
      //     <label slot="label">Pizza</label>
      //   </gux-form-field-radio>
      // `,
      // `
      //   <gux-form-field-radio>
      //     <input slot="input" type="radio" name="food-1" value="pizza"/>
      //     <label slot="label">Pizza</label>
      //     <span slot="error">Error message</span>
      //   </gux-form-field-radio>
      // `,
      // `
      //   <gux-form-field-radio>
      //     <input slot="input" type="radio" name="food-1" value="pizza" disabled/>
      //     <label slot="label">Pizza</label>
      //     <span slot="error">Error message</span>
      //   </gux-form-field-radio>
      // `,
      // `<gux-form-field-radio>
      //   <input slot="input" type="radio" name="food-1" value="spaghetti"/>
      //   <label slot="label">Spaghetti</label>
      //   <span slot="help">This is a help message</span>
      // </gux-form-field-radio>
      // `,
      // `<gux-form-field-radio>
      //   <input slot="input" type="radio" name="food-1" value="spaghetti" disabled/>
      //   <label slot="label">Spaghetti</label>
      //   <span slot="help">This is a help message</span>
      // </gux-form-field-radio>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
