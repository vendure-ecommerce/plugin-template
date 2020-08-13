import { Query, Resolver } from '@nestjs/graphql';
import { ExampleService } from '../service/example.service';
import { ExampleEntity } from '../entities/example.entity';

@Resolver()
export class ExampleResolver {
    constructor(private exampleService: ExampleService) {}

    @Query()
    examples(): Promise<ExampleEntity[]> {
        return this.exampleService.getAllItems();
    }
}
