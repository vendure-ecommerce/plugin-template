import { Injectable, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { ExampleEntity } from '../entities/example.entity';
import { PLUGIN_INIT_OPTIONS } from '../constants';
import { PluginInitOptions } from '../types';
import { ListQueryBuilder, PaginatedList } from '@vendure/core';
import { ExampleListOptions, CreateExampleInput, UpdateExampleInput } from '../generated-admin-types';

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

    async addItem(args: CreateExampleInput): Promise<ExampleEntity> {
        const repository = this.connection.getRepository(ExampleEntity);
        const example = repository.create({ name: args.name });
        await repository.save(example);

        return example;
    }

    async updateItem(args: UpdateExampleInput): Promise<ExampleEntity | undefined> {
        const repository = this.connection.getRepository(ExampleEntity);
        const example = await repository.findOne({ id: args.id });

        if (!example) return;
        const updated = { ...example, ...args };
        await repository.save(updated);

        return updated;
    }
}
