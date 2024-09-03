import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { DeletionResponse } from "@vendure/common/lib/generated-types";
import {
  Allow,
  Ctx,
  PaginatedList,
  RelationPaths,
  Relations,
  RequestContext,
  Transaction,
} from "@vendure/core";
import { ExampleEntity } from "../entities/example.entity";
import { ExampleEntityService } from "../services/example-entity.service";
import {
  MutationCreateExampleEntityArgs,
  MutationDeleteExampleEntityArgs,
  MutationUpdateExampleEntityArgs,
  QueryExampleEntitiesArgs,
  QueryExampleEntityArgs,
} from "../generated-admin-types";
import { examplePermission } from "../constants";

@Resolver()
export class ExampleAdminResolver {
  constructor(private exampleEntityService: ExampleEntityService) {}

  @Query()
  @Allow(examplePermission.Read)
  async exampleEntity(
    @Ctx() ctx: RequestContext,
    @Args() args: QueryExampleEntityArgs,
    @Relations(ExampleEntity) relations: RelationPaths<ExampleEntity>,
  ): Promise<ExampleEntity | null> {
    return this.exampleEntityService.findOne(ctx, args.id, relations);
  }

  @Query()
  @Allow(examplePermission.Read)
  async exampleEntities(
    @Ctx() ctx: RequestContext,
    @Args() args: QueryExampleEntitiesArgs,
    @Relations(ExampleEntity) relations: RelationPaths<ExampleEntity>,
  ): Promise<PaginatedList<ExampleEntity>> {
    return this.exampleEntityService.findAll(
      ctx,
      args.options || undefined,
      relations,
    );
  }

  @Mutation()
  @Transaction()
  @Allow(examplePermission.Create)
  async createExampleEntity(
    @Ctx() ctx: RequestContext,
    @Args() args: MutationCreateExampleEntityArgs,
  ): Promise<ExampleEntity> {
    return this.exampleEntityService.create(ctx, args.input);
  }

  @Mutation()
  @Transaction()
  @Allow(examplePermission.Update)
  async updateExampleEntity(
    @Ctx() ctx: RequestContext,
    @Args() args: MutationUpdateExampleEntityArgs,
  ): Promise<ExampleEntity> {
    return this.exampleEntityService.update(ctx, args.input);
  }

  @Mutation()
  @Transaction()
  @Allow(examplePermission.Delete)
  async deleteExampleEntity(
    @Ctx() ctx: RequestContext,
    @Args() args: MutationDeleteExampleEntityArgs,
  ): Promise<DeletionResponse> {
    return this.exampleEntityService.delete(ctx, args.id);
  }
}
