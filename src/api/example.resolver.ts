import { Args, Parent, Query, Resolver } from '@nestjs/graphql';
import { ExampleService } from '../service/example.service';
import { RequestContext, Ctx } from '@vendure/core';

@Resolver()
export class ExampleResolver {
    constructor(private exampleService: ExampleService) {
    }

    @Query()
    examples(@Ctx() ctx: RequestContext, @Args() args: any) {
        return this.exampleService.getAllItems();
    }
}
