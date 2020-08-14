import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ExampleService } from '../service/example.service';
import { Permission, Allow } from '@vendure/core';
import { ExampleEntity } from '../entities/example.entity';
import { MutationAddExampleArgs, MutationUpdateExampleArgs } from '../generated-admin-types';

@Resolver()
export class ExampleAdminResolver {
    constructor(private exampleService: ExampleService) {}

    @Mutation()
    @Allow(Permission.SuperAdmin)
    addExample(@Args() args: MutationAddExampleArgs): Promise<ExampleEntity> {
        return this.exampleService.addItem(args.input);
    }

    @Mutation()
    @Allow(Permission.SuperAdmin)
    updateExample(@Args() args: MutationUpdateExampleArgs): Promise<ExampleEntity | undefined> {
        return this.exampleService.updateItem(args.input);
    }
}
