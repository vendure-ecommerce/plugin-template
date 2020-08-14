import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { BaseListComponent, DataService } from '@vendure/admin-ui/core';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { GET_EXAMPLES } from './example-list.graphql';
import { GetExamples, SortOrder } from '../../generated-types';

@Component({
    selector: 'pe-example-list',
    templateUrl: './example-list.component.html',
    styleUrls: ['./example-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleListComponent
    extends BaseListComponent<GetExamples.Query, GetExamples.Items, GetExamples.Variables>
    implements OnInit {
    filterTermControl = new FormControl('');

    constructor(private dataService: DataService, router: Router, route: ActivatedRoute) {
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => {
                return this.dataService.query<GetExamples.Query>(GET_EXAMPLES, args);
            },
            (data) => data.examples,
            (skip, take) => {
                return {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    options: {
                        skip,
                        take,
                        sort: {
                            createdAt: SortOrder.Desc,
                        },
                        ...(this.filterTermControl.value
                            ? {
                                  filter: {
                                      name: {
                                          contains: this.filterTermControl.value,
                                      },
                                  },
                              }
                            : {}),
                    },
                };
            },
        );
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.filterTermControl.valueChanges
            .pipe(debounceTime(250), takeUntil(this.destroy$))
            .subscribe(() => this.refresh());
    }
}
