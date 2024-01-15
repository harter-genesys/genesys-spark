import { Component, h, Host, JSX, Prop } from '@stencil/core';

/**
 * @slot - collection of elements conforming to the ListboxOptionElement interface
 */
@Component({
  styleUrl: 'gux-option-group.scss',
  tag: 'gux-option-group',
  shadow: true
})
export class GuxOptionGroup {
  @Prop()
  label!: string;

  @Prop()
  disabled: boolean;

  render(): JSX.Element {
    return (
      <Host>
        <div
          class={{
            'gux-option-group': true,
            'gux-disabled': this.disabled
          }}
        >
          <div class="gux-option-group-label" role="presentation">
            {this.label}
          </div>
          <div role="group">
            <slot />
          </div>
          <gux-list-divider></gux-list-divider>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
