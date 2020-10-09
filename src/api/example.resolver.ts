import { Args, Query, Resolver } from '@nestjs/graphql';
import { Ctx, PaginatedList, RequestContext } from '@vendure/core';

import { ExampleService } from '../service/example.service';
import { ExampleEntity } from '../entities/example.entity';
import { QueryExamplesArgs } from '../generated-admin-types';

@Resolver()
export class ExampleResolver {
    constructor(private exampleService: ExampleService) {}

    @Query()
    examples(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryExamplesArgs,
    ): Promise<PaginatedList<ExampleEntity>> {
        return this.exampleService.getAllItems(ctx, args.options || undefined);
    }

    @Query()
    example(@Ctx() ctx: RequestContext, @Args() args: { id: string }): Promise<ExampleEntity | undefined> {
        return this.exampleService.getItem(ctx, args.id);
    }
}
