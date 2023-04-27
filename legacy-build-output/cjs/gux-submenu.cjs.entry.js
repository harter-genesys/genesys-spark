'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const guxMenu_common = require('./gux-menu.common-ada23b94.js');
const popper = require('./popper-6eb3f461.js');

const guxSubmenuCss = "gux-submenu{display:block;flex:1 1 auto;align-self:auto}gux-submenu .gux-submenu-button{all:unset;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;width:129px;height:32px;padding:0 12px 0 16px;line-height:32px;color:#2e394c;background-color:#fdfdfd}gux-submenu .gux-submenu-button:focus-within,gux-submenu .gux-submenu-button:hover{color:#fdfdfd;background-color:#2a60c8}gux-submenu .gux-submenu-button .gux-submenu-button-text{flex:1 1 auto;align-self:auto;order:0;margin-right:12px;overflow-x:hidden;text-overflow:ellipsis;white-space:nowrap}gux-submenu .gux-submenu-button .gux-submenu-open-icon{flex:0 0 auto;align-self:auto;order:0;width:16px;height:16px}gux-submenu .gux-submenu-wrapper{flex-direction:column;padding:8px 0;visibility:hidden;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}gux-submenu .gux-submenu-wrapper.gux-shown{visibility:visible}";

const GuxSubmenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.label = undefined;
    this.isShown = false;
  }
  forceUpdate(isShown) {
    if (isShown) {
      if (this.popperInstance) {
        void this.popperInstance.update();
      }
    }
  }
  /**
   * Focus on the components button element
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus() {
    this.buttonElement.focus();
  }
  onKeydown(event) {
    guxMenu_common.menuNavigation(event, this.root);
    switch (event.key) {
      case 'Enter':
        event.stopPropagation();
        this.hideDelayTimeout = afterNextRender.afterNextRenderTimeout(() => {
          this.focusOnSubmenu();
        });
        void this.guxFocus();
        break;
      case 'ArrowRight':
        event.stopPropagation();
        this.show();
        this.hideDelayTimeout = afterNextRender.afterNextRenderTimeout(() => {
          this.focusOnSubmenu();
        });
        break;
      case 'ArrowLeft':
      case 'Escape':
        if (this.submenuContentElement.contains(event.target)) {
          event.stopPropagation();
        }
        void this.guxFocus();
        break;
    }
  }
  // Using 'keyup' here because the native click handler behavior
  // for buttons is triggered on keyup when using the space key
  onKeyup(event) {
    switch (event.key) {
      case ' ':
        event.stopPropagation();
        if (this.submenuContentElement.contains(document.activeElement)) {
          this.root.focus();
        }
        else {
          this.hideDelayTimeout = afterNextRender.afterNextRenderTimeout(() => {
            this.focusOnSubmenu();
          });
        }
        break;
    }
  }
  onmouseenter() {
    this.show();
  }
  onMouseleave() {
    this.hide();
  }
  onClick(event) {
    if (this.submenuContentElement.contains(event.target)) {
      this.hide();
      return;
    }
    event.stopPropagation();
  }
  onFocusin() {
    this.show();
  }
  onFocusout() {
    this.hide();
  }
  show() {
    clearTimeout(this.hideDelayTimeout);
    this.isShown = true;
  }
  hide() {
    if (this.isShown) {
      this.hideDelayTimeout = setTimeout(() => {
        this.isShown = false;
      }, guxMenu_common.hideDelay);
    }
  }
  runPopper() {
    this.popperInstance = popper.createPopper(this.buttonElement, this.submenuElement, {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [-8, 0]
          }
        },
        {
          name: 'flip',
          enabled: false
        }
      ],
      placement: 'right-start'
    });
  }
  destroyPopper() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }
  focusOnSubmenu() {
    if (this.submenuContentElement.contains(document.activeElement)) {
      return;
    }
    const menuItems = Array.from(this.submenuContentElement.children);
    const nextFocusableElement = menuItems[0];
    void nextFocusableElement.guxFocus();
  }
  componentDidLoad() {
    this.runPopper();
  }
  disconnectedCallback() {
    this.destroyPopper();
  }
  render() {
    return (index.h(index.Host, null, index.h("button", { type: "button", class: "gux-submenu-button", role: "menuitem", tabIndex: -1, ref: el => (this.buttonElement = el), "aria-haspopup": "true", "aria-expanded": this.isShown.toString() }, index.h("span", { class: "gux-submenu-button-text" }, this.label), index.h("gux-icon", { class: "gux-submenu-open-icon", "icon-name": "chevron-small-right", decorative: true })), index.h("div", { ref: el => (this.submenuElement = el), class: {
        'gux-submenu-wrapper': true,
        'gux-shown': this.isShown
      } }, index.h("div", { role: "menu", class: "gux-submenu-content", ref: el => (this.submenuContentElement = el) }, index.h("slot", null)))));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "isShown": ["forceUpdate"]
  }; }
};
GuxSubmenu.style = guxSubmenuCss;

exports.gux_submenu = GuxSubmenu;