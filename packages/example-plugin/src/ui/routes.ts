import { registerRouteComponent } from '@vendure/admin-ui/core';
import { ExampleUiComponent } from './components/example-ui.component';

export default [
    registerRouteComponent({
        component: ExampleUiComponent,
        path: '',
        title: 'Example Route',
        breadcrumb: 'Example Route',
    }),
];