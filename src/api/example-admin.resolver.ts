import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ExampleService } from '../service/example.service';
import { Permission, Allow } from '@vendure/core';
import { ExampleEntity } from '../entities/example.entity';
import { MutationAddExampleArgs } from '../generated-admin-types';

@Resolver()
export class ExampleAdminResolver {
    constructor(private exampleService: ExampleService) {}

    @Mutation()
    @Allow(Permission.SuperAdmin)
    addExample(@Args() args: MutationAddExampleArgs): Promise<ExampleEntity> {
        return this.exampleService.addItem(args.name);
    }
}
