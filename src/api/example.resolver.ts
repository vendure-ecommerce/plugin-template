import { Args, Query, Resolver } from '@nestjs/graphql';
import { ExampleService } from '../service/example.service';
import { ExampleEntity } from '../entities/example.entity';
import { PaginatedList } from '@vendure/core';
import { QueryExamplesArgs } from '../generated-admin-types';

@Resolver()
export class ExampleResolver {
    constructor(private exampleService: ExampleService) {}

    @Query()
    examples(@Args() args: QueryExamplesArgs): Promise<PaginatedList<ExampleEntity>> {
        return this.exampleService.getAllItems(args.options || undefined);
    }

    @Query()
    example(@Args() args: { id: string }): Promise<ExampleEntity | undefined> {
        return this.exampleService.getItem(args.id);
    }
}
