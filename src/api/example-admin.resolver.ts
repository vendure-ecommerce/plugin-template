import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ExampleService } from '../service/example.service';
import { RequestContext, Ctx, Permission, Allow } from '@vendure/core';

@Resolver()
export class ExampleAdminResolver {
    constructor(private exampleService: ExampleService) {}

    @Mutation()
    @Allow(Permission.SuperAdmin)
    async addExample(@Ctx() ctx: RequestContext, @Args() args: any) {
        return this.exampleService.addItem(args.name);
    }
}
