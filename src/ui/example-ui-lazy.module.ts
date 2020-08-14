import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ExampleListComponent } from './components/example-list/example-list.component';
import { ExampleDetailComponent } from './components/example-detail/example-detail.component';
import { ExampleDetailResolver } from './providers/routing/example-detail-resolver';
import { GetExample } from './generated-types';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                component: ExampleListComponent,
                data: {
                    breadcrumb: [
                        {
                            label: 'Examples',
                            link: ['/extensions', 'examples'],
                        },
                    ],
                },
            },
            {
                path: ':id',
                component: ExampleDetailComponent,
                resolve: { entity: ExampleDetailResolver },
                data: { breadcrumb: exampleDetailBreadcrumb },
            },
        ]),
    ],
    declarations: [ExampleListComponent, ExampleDetailComponent],
    providers: [ExampleDetailResolver],
})
export class ExampleUiLazyModule {}

export function exampleDetailBreadcrumb(resolved: { entity: Observable<GetExample.Example> }): any {
    return resolved.entity.pipe(
        map((entity) => [
            {
                label: 'Examples',
                link: ['/extensions', 'examples'],
            },
            {
                label: `${entity.id}`,
                link: [],
            },
        ]),
    );
}
