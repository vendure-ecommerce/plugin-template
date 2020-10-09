import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Allow, Ctx, Permission, RequestContext, Transaction } from '@vendure/core';

import { ExampleService } from '../service/example.service';
import { ExampleEntity } from '../entities/example.entity';
import { MutationAddExampleArgs, MutationUpdateExampleArgs } from '../generated-admin-types';

@Resolver()
export class ExampleAdminResolver {
    constructor(private exampleService: ExampleService) {}

    @Transaction()
    @Mutation()
    @Allow(Permission.SuperAdmin)
    addExample(@Ctx() ctx: RequestContext, @Args() args: MutationAddExampleArgs): Promise<ExampleEntity> {
        return this.exampleService.addItem(ctx, args.input);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.SuperAdmin)
    updateExample(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationUpdateExampleArgs,
    ): Promise<ExampleEntity | undefined> {
        return this.exampleService.updateItem(ctx, args.input);
    }
}
