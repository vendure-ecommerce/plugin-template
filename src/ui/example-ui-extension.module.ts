import { NgModule } from '@angular/core';
import { SharedModule, addNavMenuSection } from '@vendure/admin-ui/core';

@NgModule({
    imports: [SharedModule],
    providers: [
        addNavMenuSection(
            {
                id: 'examples',
                label: 'Examples',
                items: [
                    {
                        id: 'examples',
                        label: 'Examples',
                        routerLink: ['/extensions/examples'],
                        icon: 'star',
                    },
                ],
            },
            'settings',
        ),
    ],
    exports: [],
})
export class ExampleUiExtensionModule {}
