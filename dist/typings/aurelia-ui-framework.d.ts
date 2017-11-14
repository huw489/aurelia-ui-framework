import { FrameworkConfiguration } from 'aurelia-framework';
import "auf-utility-library";
import './elements/core/ui-glyphs';
import './elements/core/ui-grid';
import './elements/core/ui-page';
import './elements/core/ui-viewport';
import './elements/components/ui-alerts';
import './elements/components/ui-bars';
import './elements/components/ui-drawer';
import './elements/components/ui-dropdown';
import './elements/components/ui-indicators';
import './elements/components/ui-menu';
import './elements/components/ui-panel';
import './elements/components/ui-sidebar';
import './elements/components/ui-tabpanel';
import './elements/inputs/ui-button';
import './elements/inputs/ui-date';
import './elements/inputs/ui-form';
import './elements/inputs/ui-input';
import './elements/inputs/ui-markdown';
import './elements/inputs/ui-options';
import './elements/inputs/ui-phone';
import './elements/inputs/ui-textarea';
import './attributes/ui-badge';
import './attributes/ui-colors';
import './attributes/ui-ribbon';
import './attributes/ui-tooltip';
import './value-converters/ui-lodash';
import './value-converters/ui-text';
export * from './data/ui-datamodel';
export * from './utils/ui-application';
export * from './utils/ui-constants';
export * from './utils/ui-dialog';
export * from './utils/ui-event';
export * from './utils/ui-format';
export * from './utils/ui-http';
export interface UIConfig {
    title(t: string): UIConfig;
    subTitle(t: string): UIConfig;
    version(t: string): UIConfig;
    appKey(t: string): UIConfig;
    apiUrl(t: string): UIConfig;
    apiHeaders(t: any): UIConfig;
    sendAuthHeader(t: boolean): UIConfig;
    languages(l: Array<any>): UIConfig;
}
export declare function configure(config: FrameworkConfiguration, configCallback: any): void;
