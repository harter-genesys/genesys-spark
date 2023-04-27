import{r as t,d as s,w as o,h as i,g as l}from"./p-9031eb6a.js";import{a as e}from"./p-091f51f6.js";import{b as r}from"./p-2b58afeb.js";import{O as c}from"./p-09124c44.js";import"./p-8a133b9b.js";const a={scrollLeft:"Scroll Left",scrollRight:"Scroll Right",scrollUp:"Scroll Up",scrollDown:"Scroll Down"};const n=class{constructor(s){t(this,s),this.focused=0,this.tabTriggers=void 0,this.hasHorizontalScrollbar=!1,this.hasVerticalScrollbar=!1,this.isScrolledToBeginning=!1,this.isScrolledToEnd=!1}onFocusout(t){this.root.contains(t.relatedTarget)||this.tabTriggers.forEach(((t,s)=>{t.guxGetActive().then((o=>{o?this.focused=s:t.querySelector("button").setAttribute("tabindex","-1")}))}))}onHasVerticalScrollBar(){this.checkDisabledScrollButtons()}onScroll(){this.checkDisabledScrollButtons()}onKeydown(t){switch(t.key){case"ArrowRight":case"ArrowDown":t.preventDefault(),this.handleKeyboardScroll("forward");break;case"ArrowLeft":case"ArrowUp":t.preventDefault(),this.handleKeyboardScroll("backward");break;case"Escape":t.preventDefault(),this.focusTab(this.focused);break;case"Home":t.preventDefault(),this.focusTab(0);break;case"End":t.preventDefault(),this.focusTab(this.tabTriggers.length-1)}}onMutation(){this.setTabTriggers()}async guxSetActive(t){this.tabTriggers.forEach(((s,o)=>{const i=s.tabId===t;s.guxSetActive(i),i&&(this.focused=o)}))}focusTab(t){this.focused=t,this.tabTriggers.forEach(((t,s)=>{t.guxGetActive().then((o=>{this.focused===s||o||t.querySelector("button").setAttribute("tabindex","-1")}))})),this.tabTriggers[this.focused].querySelector("button").setAttribute("tabindex","0"),this.tabTriggers[this.focused].guxFocus()}setTabTriggers(){this.tabTriggers=this.root.querySelectorAll("gux-tab"),this.triggerIds=this.tabTriggers?Array.from(this.tabTriggers).map((t=>`gux-${t.getAttribute("tab-id")}-tab`)).join(" "):""}checkForScrollbarHideOrShow(){s((()=>{const t=this.root.querySelector(".gux-scrollable-section"),s=t.clientWidth<t.scrollWidth,o=t.clientHeight<t.scrollHeight;s!==this.hasHorizontalScrollbar&&(this.hasHorizontalScrollbar=s),o!==this.hasVerticalScrollbar&&(this.hasVerticalScrollbar=o),this.checkDisabledScrollButtons()}))}handleKeyboardScroll(t){const s=this.root.querySelector(".gux-scrollable-section"),i=this.root.querySelectorAll("gux-tab")[this.focused];"forward"===t?this.focused<this.tabTriggers.length-1?(o((()=>{this.hasHorizontalScrollbar?s.scrollBy(i.clientWidth,0):s.scrollBy(0,i.clientHeight)})),this.focusTab(this.focused+1)):(o((()=>{this.hasHorizontalScrollbar?s.scrollBy(-s.scrollWidth,0):s.scrollBy(0,-s.scrollHeight)})),this.focusTab(0)):"backward"===t&&(this.focused>0?(o((()=>{this.hasHorizontalScrollbar?s.scrollBy(-i.clientWidth,0):s.scrollBy(0,-i.clientHeight)})),this.focusTab(this.focused-1)):(o((()=>{this.hasHorizontalScrollbar?s.scrollBy(s.scrollWidth,0):s.scrollBy(0,s.scrollHeight)})),this.focusTab(this.tabTriggers.length-1)))}disconnectedCallback(){this.resizeObserver&&this.resizeObserver.unobserve(this.root.querySelector(".gux-tab-container")),this.domObserver&&this.domObserver.disconnect()}async componentWillLoad(){this.setTabTriggers(),this.i18n=await r(this.root,a,"gux-tabs")}componentDidLoad(){!this.resizeObserver&&window.ResizeObserver&&(this.resizeObserver=new ResizeObserver((()=>this.checkForScrollbarHideOrShow()))),this.resizeObserver&&this.resizeObserver.observe(this.root.querySelector(".gux-scrollable-section")),!this.domObserver&&window.MutationObserver&&(this.domObserver=new MutationObserver((()=>this.checkForScrollbarHideOrShow()))),this.domObserver&&this.domObserver.observe(this.root,{childList:!0,attributes:!1,subtree:!0}),e((()=>{this.checkForScrollbarHideOrShow()}),500)}checkDisabledScrollButtons(){const t=this.root.querySelector(".gux-scrollable-section");if(this.hasHorizontalScrollbar){const s=t.scrollLeft,o=t.scrollWidth-t.clientWidth;this.isScrolledToBeginning=0===s,this.isScrolledToEnd=o-s==0}else{const s=t.scrollTop,o=t.scrollHeight-t.clientHeight;this.isScrolledToBeginning=0===s,this.isScrolledToEnd=o-s==0}}scrollLeft(){o((()=>{this.root.querySelector(".gux-scrollable-section").scrollBy(-100,0)}))}scrollRight(){o((()=>{this.root.querySelector(".gux-scrollable-section").scrollBy(100,0)}))}scrollUp(){o((()=>{this.root.querySelector(".gux-scrollable-section").scrollBy(0,-100)}))}scrollDown(){o((()=>{this.root.querySelector(".gux-scrollable-section").scrollBy(0,100)}))}render(){return i("div",{class:"gux-tab-container"},this.renderScrollButton(this.hasHorizontalScrollbar?"scrollLeft":"scrollUp"),i("div",{role:"tablist",class:"gux-scrollable-section","aria-owns":this.triggerIds},i("slot",null)),this.renderScrollButton(this.hasHorizontalScrollbar?"scrollRight":"scrollDown"))}renderScrollButton(t){return i("div",{class:"gux-scroll-button-container"},this.hasHorizontalScrollbar||this.hasVerticalScrollbar?i("button",{disabled:this.getButtonDisabled(t),tabindex:"-1",title:this.i18n(t),"aria-label":this.i18n(t),class:"gux-scroll-button",onClick:()=>this.getScrollDirection(t)},i("gux-icon",{"icon-name":this.getChevronIconName(t),decorative:!0})):null)}getButtonDisabled(t){switch(t){case"scrollLeft":case"scrollUp":return this.isScrolledToBeginning;case"scrollRight":case"scrollDown":return this.isScrolledToEnd}}getScrollDirection(t){switch(t){case"scrollLeft":this.scrollLeft();break;case"scrollRight":this.scrollRight();break;case"scrollUp":this.scrollUp();break;case"scrollDown":this.scrollDown()}}getChevronIconName(t){switch(t){case"scrollLeft":return"chevron-small-left";case"scrollRight":return"chevron-small-right";case"scrollUp":return"chevron-small-up";case"scrollDown":return"chevron-small-down"}}get root(){return l(this)}};(function(t,s,o,i){var l,e=arguments.length,r=e<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,s,o,i);else for(var c=t.length-1;c>=0;c--)(l=t[c])&&(r=(e<3?l(r):e>3?l(s,o,r):l(s,o))||r);e>3&&r&&Object.defineProperty(s,o,r)})([c({childList:!0,subtree:!0})],n.prototype,"onMutation",null),n.style="gux-tabs[orientation='vertical']{height:100%}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container{display:flex;flex-direction:column;width:160px;max-width:160px;height:100%;margin-right:16px;border-right:1px solid #d7dce5}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container .gux-scroll-button-container{width:100%}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container .gux-scroll-button-container button{width:100%}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container .gux-scrollable-section{flex-direction:column;height:100%;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;scroll-behavior:smooth}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container .gux-scrollable-section::-webkit-scrollbar{width:0;height:0}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-tab-container{height:40px;margin-bottom:16px;border-bottom:1px solid #d7dce5}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-scrollable-section{overflow-x:auto}gux-tabs .gux-tab-container{box-sizing:content-box;display:flex;width:100%;overflow-x:hidden;overflow-y:hidden;background-color:#fff}gux-tabs .gux-scrollable-section{display:flex;flex:1 1 auto;scroll-behavior:smooth;scrollbar-width:none}gux-tabs .gux-scrollable-section::-webkit-scrollbar{height:0}gux-tabs .gux-scroll-button-container{display:flex;border-radius:4px}gux-tabs .gux-scroll-button-container .gux-scroll-button{display:flex;align-items:center;justify-content:center;width:28px;height:40px;color:#202937;cursor:pointer;background-color:#c8cfda;background-color:#e2e6ee;border:none;border-radius:4px}gux-tabs .gux-scroll-button-container .gux-scroll-button gux-icon{width:16px;height:16px}gux-tabs .gux-scroll-button-container .gux-scroll-button:hover:not(:disabled){background-color:#d7dce5}gux-tabs .gux-scroll-button-container .gux-scroll-button:active:not(:disabled){background-color:#d2d8e5}gux-tabs .gux-scroll-button-container .gux-scroll-button:disabled{cursor:default;opacity:0.5}";export{n as gux_tab_list}