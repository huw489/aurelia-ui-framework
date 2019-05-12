import { e as __spread, b as __decorate, c as __metadata } from './chunk.js';
import { bindable, customElement, inlineView, containerless, viewResources, child } from 'aurelia-framework';
import 'aurelia-event-aggregator';
import { a as UIInternal } from './chunk3.js';
import ResizeObserver from 'resize-observer-polyfill';

var UIBreadcrumbs = (function () {
    function UIBreadcrumbs(element) {
        var _this = this;
        this.element = element;
        this.items = [];
        this.hasOverflow = false;
        this.obResize = new ResizeObserver(function () { return _this.calculateOverflow(); });
        this.obResize.observe(element);
    }
    UIBreadcrumbs.prototype.attached = function () {
        var _this = this;
        UIInternal.queueTask(function () { return _this.calculateOverflow(); });
    };
    UIBreadcrumbs.prototype.detached = function () {
        this.obResize.disconnect();
    };
    UIBreadcrumbs.prototype.calculateOverflow = function () {
        this.resetOverflow();
        if (this.wrapperEl.offsetWidth > this.element.offsetWidth) {
            this.hasOverflow = true;
            while (this.wrapperEl.offsetWidth > this.element.offsetWidth - 50) {
                this.overflowEl.appendChild(this.wrapperEl.children[0]);
            }
        }
        else {
            this.hasOverflow = false;
        }
    };
    UIBreadcrumbs.prototype.resetOverflow = function () {
        var _this = this;
        this.hasOverflow = false;
        __spread(this.overflowEl.children).reverse().forEach(function (child) {
            _this.wrapperEl.insertBefore(child, _this.wrapperEl.children[0]);
        });
    };
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIBreadcrumbs.prototype, "items", void 0);
    UIBreadcrumbs = __decorate([
        customElement("ui-breadcrumbs"),
        inlineView("<template class=\"ui-breadcrumbs\">\n  <div class=\"ui-breadcrumbs__overflow\" show.bind=\"hasOverflow\">\n  <ui-button type=\"tool\" size=\"xs\" no-caret ui-theme=\"secondary\">\n    <ui-svg-icon class=\"ui-btn__icon\" icon=\"ellipsis\"></ui-svg-icon>\n    <ui-drop close-on-click=\"false\"><ui-menu ref=\"overflowEl\"></ui-menu></ui-drop>\n  </ui-button>\n  </div>\n  <div class=\"ui-breadcrumbs__wrapper\" ref=\"wrapperEl\">\n  <template repeat.for=\"item of items\">\n    <template if.bind=\"item.href\">\n    <a class=\"ui-breadcrumbs__link\" href.bind=\"item.href\"><ui-icon if.bind=\"item.icon\" icon.bind=\"item.icon\"></ui-icon>${item.label}</a>\n    </template>\n    <template else>\n    <span class=\"ui-breadcrumbs__label\"><ui-icon if.bind=\"item.icon\" icon.bind=\"item.icon\"></ui-icon>${item.label}</span>\n    </template>\n  </template>\n  </div>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], UIBreadcrumbs);
    return UIBreadcrumbs;
}());

var MenuItem = (function () {
    function MenuItem() {
    }
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], MenuItem.prototype, "item", void 0);
    MenuItem = __decorate([
        containerless(),
        customElement("menu-item"),
        inlineView("<template>\n  <template if.bind=\"item.group\">\n    <ui-menu-group label.bind=\"item.group\">\n      <menu-item repeat.for=\"groupItem of item.items\" item.bind=\"groupItem\"></menu-item>\n    </ui-menu-group>\n  </template>\n  <template if.bind=\"item.label\">\n    <ui-menu-item label.bind=\"item.label\" href.bind=\"item.href\"\n    icon.bind=\"item.icon\" icon-color.bind=\"item.iconColor\" ui-badge=\"value.bind:item.badge; theme.bind:item.badgeTheme;\"\n    disabled.bind=\"typeof item.disabled === 'function' ? item.disabled() : item.disabled\"\n    active.bind=\"typeof item.active === 'function' ? item.active() : item.active\"\n    hide.bind=\"typeof item.hidden === 'function' ? item.hidden() : item.hidden\"\n    click.trigger=\"item.handler && item.handler()\">\n      <ui-drop if.bind=\"item.items\">\n        <ui-menu>\n          <menu-item repeat.for=\"innerItem of item.items\" item.bind=\"innerItem\"></menu-item>\n        </ui-menu>\n      </ui-drop>\n    </ui-menu-item>\n  </template>\n  <template if.bind=\"item === '-'\">\n    <ui-divider></ui-divider>\n  </template>\n</template>")
    ], MenuItem);
    return MenuItem;
}());

var UIMenu = (function () {
    function UIMenu(element) {
        this.element = element;
    }
    UIMenu.prototype.attached = function () {
        var active = this.element.querySelector(".ui-menu__item__link[data-active='true']");
        if (active) {
            active.scrollIntoView({ block: "center", inline: "nearest" });
        }
    };
    __decorate([
        bindable(),
        __metadata("design:type", Array)
    ], UIMenu.prototype, "menuItems", void 0);
    UIMenu = __decorate([
        customElement("ui-menu"),
        viewResources(MenuItem),
        inlineView("<template class=\"ui-menu\"><slot>\n  <template if.bind=\"menuItems\">\n    <menu-item repeat.for=\"item of menuItems\" item.bind=\"item\"></menu-item>\n  </template>\n</slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIMenu);
    return UIMenu;
}());

var UIMenuGroup = (function () {
    function UIMenuGroup(element) {
        this.element = element;
        this.label = "";
        this.collapsed = false;
    }
    UIMenuGroup.prototype.attached = function () {
        if (this.element.hasAttribute("collapsible")) {
            this.vmElement.classList.add("ui-menu__group--collapsible");
        }
    };
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIMenuGroup.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIMenuGroup.prototype, "collapsed", void 0);
    UIMenuGroup = __decorate([
        containerless(),
        customElement("ui-menu-group"),
        inlineView("<template><fieldset class=\"ui-menu__group\" data-collapsed.bind=\"collapsed\" ref=\"vmElement\">\n    <legend class=\"ui-menu__group__label\" if.bind=\"label\" innerhtml.bind=\"label\" click.trigger=\"collapsed = !collapsed\"></legend>\n    <div class=\"ui-menu__group__container\"><slot></slot></div>\n  </fieldset></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIMenuGroup);
    return UIMenuGroup;
}());

var view = "<template class=\"ui-menu__item\" value.bind=\"value\">\n  <a ref=\"badgeEl\" data-active.bind=\"active\" data-disabled.bind=\"disabled\" click.trigger=\"fireClick($event)\" class=\"ui-menu__item__link\" data-open.bind=\"!split && dropEl.isOpen\">\n    <ui-icon class=\"ui-menu__item__icon\" icon.bind=\"icon\" if.bind=\"icon\" ui-color.bind=\"iconColor\"></ui-icon>\n    <span class=\"ui-menu__item__label\">\n      <slot>${label}</slot>\n    </span>\n    <ui-svg-icon if.bind=\"!split && hasDrop\" class=\"ui-menu__item__caret\" icon.bind=\"dropIcon\"></ui-svg-icon>\n  </a>\n  <a data-active.bind=\"split && dropEl.isOpen\" class=\"ui-menu__item__caret ui-menu__item__caret--split\" if.bind=\"split && hasDrop\" click.trigger=\"toggleDrop()\" data-open.bind=\"split && dropEl.isOpen\">\n    <ui-svg-icon class=\"ui-icon__caret split\" icon.bind=\"dropIcon\"></ui-svg-icon>\n  </a>\n  <slot name=\"ui-drop\"></slot>\n</template>\n";

var UIMenuItem = (function () {
    function UIMenuItem(element) {
        this.element = element;
        this.label = "";
        this.href = "";
        this.icon = "";
        this.iconColor = "";
        this.active = false;
        this.disabled = false;
        this.dropIcon = "caret";
        this.isInMenubar = false;
        this.hasDrop = false;
        this.split = element.hasAttribute("split");
    }
    UIMenuItem.prototype.attached = function () {
        var _this = this;
        UIInternal.queueTask(function () {
            _this.hasDrop = !!_this.elDropdown;
            _this.isInMenubar = !!getParentByClass(_this.element, "ui-menu__bar");
            var isInDropdown = !!getParentByClass(_this.element, "ui-drop__body");
            if (_this.hasDrop) {
                _this.dropEl = getSlotViewModel(_this.elDropdown);
                if (isInDropdown || !_this.isInMenubar) {
                    _this.dropIcon = "page-next";
                    _this.dropEl.position = "tl";
                    _this.dropEl.anchorPosition = "tr";
                    _this.dropEl.stretch = false;
                    _this.dropEl.attachToViewport = isInDropdown;
                }
                _this.dropEl.tether(_this.element);
            }
        });
        this.hrefChanged();
    };
    UIMenuItem.prototype.hrefChanged = function () {
        if (this.badgeEl) {
            if (this.href) {
                this.badgeEl.href = this.href;
            }
            else if (this.badgeEl.attributes.getNamedItem("href")) {
                this.badgeEl.attributes.removeNamedItem("href");
            }
        }
    };
    UIMenuItem.prototype.activeChanged = function () {
        if (this.active) {
            this.element.scrollIntoView({ block: "center", inline: "nearest" });
        }
    };
    UIMenuItem.prototype.fireClick = function ($event) {
        if (!this.href) {
            $event.stopEvent();
            if (this.hasDrop && !this.split) {
                this.toggleDrop();
                return false;
            }
            return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
        }
    };
    UIMenuItem.prototype.toggleDrop = function () {
        var beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
        var afterEvent = this.dropEl.isOpen ? "close" : "open";
        if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
            this.dropEl.toggleDrop();
            this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
        }
    };
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIMenuItem.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIMenuItem.prototype, "href", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIMenuItem.prototype, "icon", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIMenuItem.prototype, "iconColor", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIMenuItem.prototype, "id", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIMenuItem.prototype, "active", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIMenuItem.prototype, "disabled", void 0);
    __decorate([
        child(".ui-drop"),
        __metadata("design:type", Element)
    ], UIMenuItem.prototype, "elDropdown", void 0);
    UIMenuItem = __decorate([
        customElement("ui-menu-item"),
        inlineView(view),
        __metadata("design:paramtypes", [Element])
    ], UIMenuItem);
    return UIMenuItem;
}());

var UIMenubar = (function () {
    function UIMenubar(element) {
        var _this = this;
        this.element = element;
        this.hasOverflow = false;
        this.obResize = new ResizeObserver(function () { return _this.calculateOverflow(); });
        this.obResize.observe(element);
    }
    UIMenubar.prototype.attached = function () {
        var _this = this;
        UIInternal.queueTask(function () { return _this.calculateOverflow(); });
    };
    UIMenubar.prototype.detached = function () {
        this.obResize.disconnect();
    };
    UIMenubar.prototype.calculateOverflow = function () {
        var _this = this;
        var _a;
        this.resetOverflow();
        var overflowItems = [];
        var isRtl = window.getComputedStyle(this.wrapperEl).direction === "rtl";
        __spread(this.wrapperEl.children).reverse().forEach(function (item) {
            if ((!isRtl && _this.wrapperEl.offsetWidth - (item.offsetLeft + item.offsetWidth) <= 30) ||
                (isRtl && _this.wrapperEl.offsetWidth - item.offsetLeft >= _this.wrapperEl.offsetWidth - 30)) {
                overflowItems.splice(0, 0, item);
                _this.hasOverflow = true;
            }
        });
        (_a = this.overflowEl).append.apply(_a, __spread(overflowItems));
    };
    UIMenubar.prototype.resetOverflow = function () {
        var _this = this;
        this.hasOverflow = false;
        this.overflowEl.children.forEach(function (child) {
            _this.wrapperEl.appendChild(child);
        });
    };
    UIMenubar = __decorate([
        customElement("ui-menubar"),
        inlineView("<template class=\"ui-menu__bar\">\n  <div class=\"ui-menu__bar__wrapper\" ref=\"wrapperEl\"><slot></slot></div>\n  <ui-button type=\"tool\" size=\"xs\" no-caret class=\"ui-menu__overflow\" ui-theme=\"secondary\" show.bind=\"hasOverflow\">\n    <ui-svg-icon class=\"ui-btn__icon\" icon=\"overflow\"></ui-svg-icon>\n    <ui-drop close-on-click=\"false\"><ui-menu ref=\"overflowEl\"></ui-menu></ui-drop>\n  </ui-button>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], UIMenubar);
    return UIMenubar;
}());

var Menus = [UIMenu, UIMenuGroup, UIMenuItem, UIMenubar, UIBreadcrumbs];

export { Menus };
//# sourceMappingURL=ui-menus.js.map