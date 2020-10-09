import { Inject, Injectable } from '@nestjs/common';
import { ListQueryBuilder, PaginatedList, RequestContext, TransactionalConnection } from '@vendure/core';

import { ExampleEntity } from '../entities/example.entity';
import { PLUGIN_INIT_OPTIONS } from '../constants';
import { PluginInitOptions } from '../types';
import { CreateExampleInput, ExampleListOptions, UpdateExampleInput } from '../generated-admin-types';

@Injectable()
export class ExampleService {
    constructor(
        private connection: TransactionalConnection,
        @Inject(PLUGIN_INIT_OPTIONS) private options: PluginInitOptions,
        private listQueryBuilder: ListQueryBuilder,
    ) {}

    async getAllItems(
        ctx: RequestContext,
        options?: ExampleListOptions,
    ): Promise<PaginatedList<ExampleEntity>> {
        return this.listQueryBuilder
            .build(ExampleEntity, options, { ctx })
            .getManyAndCount()
            .then(([items, totalItems]) => ({
                items,
                totalItems,
            }));
    }

    async getItem(ctx: RequestContext, id: string): Promise<ExampleEntity | undefined> {
        return this.connection.getRepository(ctx, ExampleEntity).findOne(id);
    }

    async addItem(ctx: RequestContext, args: CreateExampleInput): Promise<ExampleEntity> {
        const repository = this.connection.getRepository(ctx, ExampleEntity);
        const example = repository.create({ name: args.name });
        await repository.save(example);

        return example;
    }

    async updateItem(ctx: RequestContext, args: UpdateExampleInput): Promise<ExampleEntity | undefined> {
        const repository = this.connection.getRepository(ctx, ExampleEntity);
        const example = await repository.findOne({ id: args.id });

        if (!example) return;
        const updated = { ...example, ...args };
        await repository.save(updated);

        return updated;
    }
}
