'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');

const guxListDividerCss = ":host{position:relative;display:flex;height:32px;height:1px;padding:0;margin:16px 0;line-height:32px;pointer-events:none;cursor:pointer;background-color:#c8cfda}";

const GuxListDividerLegacy = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("span", { role: "presentation", class: "gux-list-item gux-divider", tabindex: -1 }));
  }
};
GuxListDividerLegacy.style = guxListDividerCss;

exports.gux_list_divider_legacy = GuxListDividerLegacy;