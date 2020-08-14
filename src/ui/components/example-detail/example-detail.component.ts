import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BaseDetailComponent,
    DataService,
    NotificationService,
    ServerConfigService,
} from '@vendure/admin-ui/core';
import { Observable, of } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

import {
    Example,
    AddExample,
    CreateExampleInput,
    UpdateExample,
    UpdateExampleInput,
} from '../../generated-types';
import { ADD_EXAMPLE, UPDATE_EXAMPLE } from './example-detail.graphql';

@Component({
    selector: 'pe-example-detail',
    templateUrl: './example-detail.component.html',
    styleUrls: ['./example-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ExampleDetailComponent extends BaseDetailComponent<Example> implements OnInit {
    detailForm: FormGroup;

    constructor(
        route: ActivatedRoute,
        router: Router,
        serverConfigService: ServerConfigService,
        private formBuilder: FormBuilder,
        protected dataService: DataService,
        private changeDetector: ChangeDetectorRef,
        private notificationService: NotificationService,
    ) {
        super(route, router, serverConfigService, dataService);
        this.detailForm = this.formBuilder.group({
            name: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.init();
    }

    create(): void {
        if (!this.detailForm) {
            return;
        }
        const formValue = this.detailForm.value;
        const example: CreateExampleInput = {
            name: formValue.name,
        };
        this.dataService
            .mutate<AddExample.Mutation, AddExample.Variables>(ADD_EXAMPLE, { input: example })
            .subscribe(
                (data) => {
                    this.notificationService.success('common.notify-create-success', {
                        entity: 'Example',
                    });
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.router.navigate(['../', data.addExample.id], { relativeTo: this.route });
                },
                () => {
                    this.notificationService.error('common.notify-create-error', {
                        entity: 'Example',
                    });
                },
            );
    }

    save(): void {
        this.saveChanges()
            .pipe(filter((result) => !!result))
            .subscribe(
                () => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success('common.notify-update-success', {
                        entity: 'Example',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-update-error', {
                        entity: 'Example',
                    });
                },
            );
    }

    private saveChanges(): Observable<boolean> {
        if (this.detailForm.dirty) {
            const formValue = this.detailForm.value;
            const input: UpdateExampleInput = {
                id: this.id,
                name: formValue.name,
            };
            return this.dataService
                .mutate<UpdateExample.Mutation, UpdateExample.Variables>(UPDATE_EXAMPLE, {
                    input,
                })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
    }

    protected setFormValues(entity: Example): void {
        this.detailForm.patchValue({
            name: entity.name,
        });
    }
}
