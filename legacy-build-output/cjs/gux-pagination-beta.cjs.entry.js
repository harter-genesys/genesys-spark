'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const usage = require('./usage-da9572bf.js');

const guxPaginationBetaCss = ":host{display:block;border-top:1px solid #e2e6ee}.gux-pagination-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:space-between;height:40px;margin:12px 12px 0 12px}.gux-pagination-container .gux-pagination-info{display:flex;flex:0 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:flex-start;order:0}.gux-pagination-container .gux-pagination-info>*{flex:0 1 auto;align-self:auto;order:0}.gux-pagination-container .gux-pagination-spacer{flex:1 1 auto;align-self:auto;order:0}.gux-pagination-container .gux-pagination-change{flex:0 1 auto;align-self:auto;order:0}.gux-pagination-container .gux-pagination-change:first-child{margin-left:0}";

const minAdvancedSpacerWidth = 24;
const GuxPaginationBeta = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.guxpaginationchange = index.createEvent(this, "guxpaginationchange", 7);
    this.reinstateLayoutBreakpoint = 0;
    this.layout = 'advanced';
    this.currentPage = 1;
    this.totalItems = 0;
    this.itemsPerPage = 25;
    this.totalPages = undefined;
    this.displayedLayout = undefined;
  }
  setPage(page) {
    if (page <= 0) {
      this.setPage(1);
      return;
    }
    const totalPages = this.calculateTotalPages(this.totalItems, this.itemsPerPage);
    if (page > totalPages) {
      this.setPage(totalPages);
      return;
    }
    this.currentPage = page;
    this.guxpaginationchange.emit({
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });
  }
  handleInternalitemsperpagechange(event) {
    this.itemsPerPage = event.detail;
    this.setPage(1);
  }
  handleInternalcurrentpagechange(event) {
    this.setPage(event.detail);
  }
  calculateTotalPages(totalItems, itemsPerPage) {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }
  calculateCurrentPage(totalPages, currentPage) {
    const minCurrentPage = totalPages > 0 ? 1 : 0;
    return Math.max(minCurrentPage, Math.min(currentPage, totalPages));
  }
  checkPaginationContainerWidthForLayout() {
    index.readTask(() => {
      const container = this.root.shadowRoot.querySelector('.gux-pagination-container');
      const spacer = this.root.shadowRoot.querySelector('.gux-pagination-spacer');
      const containerWidth = container.clientWidth;
      const spacerWidth = spacer.clientWidth;
      if (spacerWidth < minAdvancedSpacerWidth &&
        this.displayedLayout !== 'simple') {
        this.reinstateLayoutBreakpoint = containerWidth;
        this.displayedLayout = 'simple';
      }
      else if (containerWidth > this.reinstateLayoutBreakpoint) {
        this.reinstateLayoutBreakpoint = 0;
        this.displayedLayout = this.layout;
      }
    });
  }
  componentWillLoad() {
    usage.trackComponent(this.root, { variant: this.layout });
  }
  componentWillRender() {
    this.totalPages = this.calculateTotalPages(this.totalItems, this.itemsPerPage);
    this.currentPage = this.calculateCurrentPage(this.totalPages, this.currentPage);
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.root.shadowRoot.querySelector('.gux-pagination-container'));
    }
  }
  componentDidLoad() {
    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => this.checkPaginationContainerWidthForLayout());
    }
    if (this.resizeObserver) {
      this.resizeObserver.observe(this.root.shadowRoot.querySelector('.gux-pagination-container'));
    }
    afterNextRender.afterNextRenderTimeout(() => {
      this.checkPaginationContainerWidthForLayout();
    }, 500);
  }
  render() {
    return (index.h("div", { class: "gux-pagination-container" }, index.h("div", { class: "gux-pagination-info" }, index.h("gux-pagination-item-counts-beta", { "total-items": this.totalItems, "current-page": this.currentPage, "items-per-page": this.itemsPerPage }), this.displayedLayout === 'advanced' && (index.h("gux-pagination-items-per-page-beta", { "items-per-page": this.itemsPerPage, onInternalitemsperpagechange: this.handleInternalitemsperpagechange.bind(this) }))), index.h("div", { class: "gux-pagination-spacer" }), index.h("div", { class: "gux-pagination-change" }, index.h("gux-pagination-buttons-beta", { layout: this.displayedLayout, "current-page": this.currentPage, "total-pages": this.totalPages, onInternalcurrentpagechange: this.handleInternalcurrentpagechange.bind(this) }))));
  }
  get root() { return index.getElement(this); }
};
GuxPaginationBeta.style = guxPaginationBetaCss;

exports.gux_pagination_beta = GuxPaginationBeta;