import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, BaseEntityResolver } from '@vendure/admin-ui/core';

import { GetExample } from '../../generated-types';

import { GET_EXAMPLE } from './example-detail-resolver.graphql';

@Injectable()
export class ExampleDetailResolver extends BaseEntityResolver<GetExample.Example> {
    constructor(router: Router, dataService: DataService) {
        super(
            router,
            {
                id: '',
                createdAt: new Date(),
                name: '',
            },
            (id) =>
                dataService
                    .query<GetExample.Query, GetExample.Variables>(GET_EXAMPLE, { id })
                    .mapStream((data) => data.example),
        );
    }
}
