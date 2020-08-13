import { Injectable, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { ExampleEntity } from '../entities/example.entity';
import { PLUGIN_INIT_OPTIONS } from '../constants';
import { PluginInitOptions } from '../types';
import { ListQueryBuilder, PaginatedList } from '@vendure/core';
import { ExampleListOptions } from '../generated-admin-types';

@Injectable()
export class ExampleService {
    constructor(
        @InjectConnection() private connection: Connection,
        @Inject(PLUGIN_INIT_OPTIONS) private options: PluginInitOptions,
        private listQueryBuilder: ListQueryBuilder,
    ) {}

    async getAllItems(options?: ExampleListOptions): Promise<PaginatedList<ExampleEntity>> {
        return this.listQueryBuilder
            .build(ExampleEntity, options)
            .getManyAndCount()
            .then(([items, totalItems]) => ({
                items,
                totalItems,
            }));
    }

    async getItem(id: string): Promise<ExampleEntity | undefined> {
        return this.connection.getRepository(ExampleEntity).findOne(id);
    }

    async addItem(name: string): Promise<ExampleEntity> {
        const repository = this.connection.getRepository(ExampleEntity);
        const example = repository.create({ name });
        await repository.save(example);

        return example;
    }
}
