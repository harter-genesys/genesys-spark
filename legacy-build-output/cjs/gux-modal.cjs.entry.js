'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');
const usage = require('./usage-da9572bf.js');

const guxModalCss = ":host .gux-modal{position:fixed;top:0;right:0;bottom:0;left:0;z-index:var(--gux-zindex-modal, 1);display:flex;align-items:center;justify-content:center;color:#2e394c;background:rgba(32, 41, 55, 0.8)}:host .gux-modal .gux-modal-container{box-shadow:0 8px 24px rgba(32, 41, 55, 0.4);position:relative;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;padding:40px;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px}:host .gux-modal .gux-modal-container.gux-small{width:416px;max-height:min(368px, 100vh - 2 * 24px)}:host .gux-modal .gux-modal-container.gux-medium{width:672px;max-height:min(640px, 100vh - 2 * 24px)}:host .gux-modal .gux-modal-container.gux-large{width:940px;max-height:min(640px, 100vh - 2 * 24px)}:host .gux-modal .gux-modal-container.gux-dynamic{max-width:calc(100vw - 2 * 24px);max-height:calc(100vh - 2 * 24px)}:host .gux-modal .gux-modal-container.gux-dynamic .gux-modal-content{max-height:none}:host .gux-modal .gux-modal-container .gux-modal-header{padding-bottom:24px;margin:0;font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:24px;line-height:32px}:host .gux-modal .gux-modal-container .gux-modal-content{max-height:432px;margin:0 8px 24px;overflow-y:auto}:host .gux-modal .gux-modal-container .gux-modal-content.gux-no-buttons{margin-bottom:0}:host .gux-modal .gux-modal-container .gux-button-footer{display:flex;justify-content:space-between}:host .gux-modal .gux-modal-container .gux-button-footer .gux-left-align-buttons gux-button{padding-right:5px}:host .gux-modal .gux-modal-container .gux-button-footer .gux-right-align-buttons gux-button{padding-left:5px}@media (max-width: 416px){:host .gux-modal .gux-modal-container.gux-small,:host .gux-modal .gux-modal-container.gux-medium,:host .gux-modal .gux-modal-container.gux-large{width:100%;height:100%}}";

const GuxModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.guxdismiss = index.createEvent(this, "guxdismiss", 7);
    this.size = 'dynamic';
    this.trapFocus = true;
    this.initialFocus = undefined;
  }
  handleKeyEvent(event) {
    if (event.key === 'Escape') {
      this.onDismissHandler(event);
    }
  }
  connectedCallback() {
    this.triggerElement = document.activeElement;
  }
  componentWillLoad() {
    const trapFocusVariant = this.trapFocus ? 'trapfocuson' : 'trapfocusoff';
    const componentVariant = `${this.size}-${trapFocusVariant}`;
    usage.trackComponent(this.root, { variant: componentVariant });
  }
  componentDidLoad() {
    var _a, _b, _c;
    const initialFocusElement = this.getInitialFocusElement();
    if (initialFocusElement) {
      // using .focus?.() instead of .focus() as a workaround for a Stencil bug in unit tests
      // https://github.com/ionic-team/stencil/issues/1964
      (_a = initialFocusElement.focus) === null || _a === void 0 ? void 0 : _a.call(initialFocusElement);
    }
    else if (this.dismissButton) {
      (_c = (_b = this.dismissButton).focus) === null || _c === void 0 ? void 0 : _c.call(_b);
    }
  }
  render() {
    const hasModalTitleSlot = this.hasModalTitleSlot();
    const hasFooterButtons = this.hasFooterButtons();
    const titleID = randomHtmlId.randomHTMLId();
    return (index.h("div", { class: "gux-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": hasModalTitleSlot ? titleID : null }, index.h("div", { class: `gux-modal-container gux-${this.size}` }, this.renderModalTrapFocusEl(), hasModalTitleSlot && (index.h("h1", { class: "gux-modal-header", id: titleID }, index.h("slot", { name: "title" }))), index.h("gux-dismiss-button", { onClick: this.onDismissHandler.bind(this), ref: el => (this.dismissButton = el) }), index.h("div", { class: {
        'gux-modal-content': true,
        'gux-no-buttons': !hasFooterButtons
      } }, index.h("p", null, index.h("slot", { name: "content" }))), hasFooterButtons && (index.h("div", { class: "gux-button-footer" }, index.h("div", { class: "gux-left-align-buttons" }, index.h("slot", { name: "left-align-buttons" })), index.h("div", { class: "gux-right-align-buttons" }, index.h("slot", { name: "right-align-buttons" })))), this.renderModalTrapFocusEl())));
  }
  // When trap-focus is enabled, focusing this element
  // will immediately redirect focus back to the dismiss button at the top of the modal.
  renderModalTrapFocusEl() {
    if (this.trapFocus) {
      return (index.h("span", { onFocus: () => this.dismissButton.focus(), tabindex: "0" }));
    }
  }
  getInitialFocusElement() {
    return this.initialFocus
      ? this.root.querySelector(this.initialFocus)
      : undefined;
  }
  hasModalTitleSlot() {
    return Boolean(this.root.querySelector('[slot="title"]'));
  }
  hasFooterButtons() {
    return (Boolean(this.root.querySelector('[slot="left-align-buttons"]')) ||
      Boolean(this.root.querySelector('[slot="right-align-buttons"]')));
  }
  onDismissHandler(event) {
    var _a;
    event.stopPropagation();
    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.remove();
      (_a = this.triggerElement) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }
  get root() { return index.getElement(this); }
};
GuxModal.style = guxModalCss;

exports.gux_modal = GuxModal;