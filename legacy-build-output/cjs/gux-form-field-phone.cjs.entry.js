'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const index$1 = require('./index-c4441830.js');
const onMutation = require('./on-mutation-83dff2a7.js');
const onAttributeChange = require('./on-attribute-change-37556263.js');
const usage = require('./usage-da9572bf.js');
const getSlotTextContent = require('./get-slot-text-content-d5c6dceb.js');
const guxFormField_service = require('./gux-form-field.service-6696052f.js');
const hasSlot = require('./has-slot-2e73d6e7.js');
require('./get-closest-element-ab4b2eee.js');
require('./random-html-id-b86b61c0.js');
require('./log-error-ddbca3a0.js');
require('./set-input-value-610d7da3.js');
require('./simulate-native-event-fe3e62da.js');

const required = "Required";
const invalidPhoneNumber = "Number is not valid";
const componentResources = {
	required: required,
	invalidPhoneNumber: invalidPhoneNumber
};

const guxFormFieldPhoneCss = ".gux-form-field-fieldset-container{min-width:0;padding:0;margin:var(--gux-form-field-fieldset-container-margin-top, 16px) 0 var(--gux-form-field-fieldset-container-margin-bottom, 16px) 0;border:none}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-legend-label{padding:0}.gux-form-field-legend-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-legend-label.gux-beside{position:relative;top:8px;float:left;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-legend-label.gux-above{margin-bottom:8px}.gux-form-field-legend-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}.gux-input-and-error-container{flex-grow:1}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const GuxFormFieldPhone = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.phonevalidationerror = index.createEvent(this, "phonevalidationerror", 7);
    this.labelPosition = undefined;
    this.computedLabelPosition = 'above';
    this.disabled = undefined;
    this.required = false;
    this.hasError = false;
    this.hasInternalError = false;
    this.hasHelp = false;
  }
  listenForInternalError(event) {
    this.hasInternalError = event.detail;
    this.watchValue(this.hasInternalError);
    this.phonevalidationerror.emit(this.hasInternalError);
  }
  watchValue(hasError) {
    const phoneInputSlot = this.root.querySelector('gux-phone-input-beta');
    if (phoneInputSlot) {
      phoneInputSlot.hasError = hasError;
    }
  }
  onMutation() {
    this.hasError = hasSlot.hasSlot(this.root, 'error');
    this.hasHelp = hasSlot.hasSlot(this.root, 'help');
  }
  async componentWillLoad() {
    this.getI18nValue = await index$1.buildI18nForComponent(this.root, componentResources);
    this.setInput();
    this.setLabel();
    this.hasError = hasSlot.hasSlot(this.root, 'error');
    this.hasHelp = hasSlot.hasSlot(this.root, 'help');
    usage.trackComponent(this.root, { variant: this.variant });
  }
  disconnectedCallback() {
    this.disabledObserver.disconnect();
    this.requiredObserver.disconnect();
  }
  render() {
    return (index.h(getSlotTextContent.GuxFormFieldFieldsetContainer, { labelPosition: this.computedLabelPosition }, index.h(getSlotTextContent.GuxFormFieldLegendLabel, { position: this.computedLabelPosition, required: this.required }, index.h("slot", { name: "label", onSlotchange: () => this.setLabel() }), this.renderScreenReaderText(this.getI18nValue('required'), this.required), this.renderScreenReaderText(getSlotTextContent.getSlotTextContent(this.root, 'error'), this.hasError)), index.h("div", { class: "gux-input-and-error-container" }, index.h("div", { class: {
        'gux-input': true,
        'gux-input-error': this.hasError
      } }, index.h("div", { class: {
        'gux-input-container': true,
        'gux-disabled': this.disabled
      } }, index.h("slot", null))), index.h(guxFormField_service.GuxFormFieldError, { show: this.hasError }, index.h("slot", { name: "error" })), index.h(guxFormField_service.GuxFormFieldError, { show: this.hasInternalError }, index.h("span", null, this.getI18nValue('invalidPhoneNumber'))), index.h(guxFormField_service.GuxFormFieldHelp, { show: !this.hasError && this.hasHelp }, index.h("slot", { name: "help" })))));
  }
  renderScreenReaderText(text, condition = true) {
    if (condition) {
      return (index.h("gux-screen-reader-beta", null, text));
    }
  }
  get variant() {
    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';
    const type = 'phoneInput';
    return `${type}-${labelPositionVariant}`;
  }
  setInput() {
    this.phoneInputElement = this.root.querySelector('gux-phone-input-beta');
    this.disabled = this.phoneInputElement.disabled;
    this.required = this.phoneInputElement.required;
    this.disabledObserver = onAttributeChange.onDisabledChange(this.phoneInputElement, (disabled) => {
      this.disabled = disabled;
    });
    this.requiredObserver = onAttributeChange.onRequiredChange(this.phoneInputElement, (required) => {
      this.required = required;
    });
    guxFormField_service.validateFormIds(this.root, this.phoneInputElement);
  }
  setLabel() {
    this.label = this.root.querySelector('label[slot="label"]');
    this.computedLabelPosition = guxFormField_service.getComputedLabelPosition(this.label, this.labelPosition);
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "hasError": ["watchValue"]
  }; }
};
__decorate([
  onMutation.OnMutation({ childList: true, subtree: true })
], GuxFormFieldPhone.prototype, "onMutation", null);
GuxFormFieldPhone.style = guxFormFieldPhoneCss;

exports.gux_form_field_phone = GuxFormFieldPhone;