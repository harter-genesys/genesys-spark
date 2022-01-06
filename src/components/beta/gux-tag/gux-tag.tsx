import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { trackComponent } from '../../../usage-tracking';

import tagResources from './i18n/en.json';
import { GuxTagColor } from './gux-tag.types';

@Component({
  styleUrl: 'gux-tag.less',
  tag: 'gux-tag-beta',
  shadow: true
})
export class GuxTag {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  /**
   * Triggered when click on remove button
   */
  @Event()
  guxdelete: EventEmitter<string>;

  /**
   * Tag background color.
   */
  @Prop()
  color: GuxTagColor = 'default';

  /**
   * Index for remove tag
   */
  @Prop()
  value: string;

  /**
   * Tag is removable.
   */
  @Prop()
  disabled: boolean = false;

  /**
   * Tag is removable.
   */
  @Prop()
  removable: boolean = false;

  /**
   * Tag icon name.
   */
  @Prop()
  icon: string;

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Backspace':
      case 'Delete':
        this.removeTag();
    }
  }

  private removeTag(): void {
    if (this.disabled || !this.removable) {
      return;
    }

    this.guxdelete.emit(this.value);
  }

  private renderIcon(): JSX.Element {
    if (this.icon) {
      return (
        <div class="gux-tag-icon-container">
          <gux-icon class="gux-tag-icon" icon-name={this.icon} decorative />
        </div>
      ) as JSX.Element;
    }
  }

  private renderText(): JSX.Element {
    return (
      <div class="gux-tag-text">
        <slot />
      </div>
    ) as JSX.Element;
  }

  private renderRemoveButton(): JSX.Element {
    if (this.removable) {
      return (
        <button
          class="gux-tag-remove-button"
          onClick={this.removeTag.bind(this)}
          type="button"
          disabled={this.disabled}
        >
          <gux-icon
            class="gux-tag-remove-icon"
            icon-name="close"
            screenreader-text={this.i18n('remove-tag')}
          />
        </button>
      ) as JSX.Element;
    }
  }

  componentWillLoad(): void {
    trackComponent(this.root, {
      variant: this.removable ? 'removable' : 'permenant'
    });
  }

  async componentWillRender(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, tagResources);
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-tag': true,
          [`gux-${this.color}`]: true,
          'gux-disabled': this.disabled
        }}
      >
        {this.renderIcon()}
        {this.renderText()}
        {this.renderRemoveButton()}
      </div>
    ) as JSX.Element;
  }
}
