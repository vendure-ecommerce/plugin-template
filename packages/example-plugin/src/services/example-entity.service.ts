import { Inject, Injectable } from "@nestjs/common";
import {
  DeletionResponse,
  DeletionResult,
} from "@vendure/common/lib/generated-types";
import { ID, PaginatedList } from "@vendure/common/lib/shared-types";
import {
  assertFound,
  CustomFieldRelationService,
  ListQueryBuilder,
  ListQueryOptions,
  patchEntity,
  RelationPaths,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";
import { PLUGIN_INIT_OPTIONS } from "../constants";
import { ExampleEntity } from "../entities/example.entity";
import { ExampleOptions } from "../types";
import {
  CreateExampleEntityInput,
  UpdateExampleEntityInput,
} from "../generated-admin-types";

@Injectable()
export class ExampleEntityService {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder,
    private customFieldRelationService: CustomFieldRelationService,
    @Inject(PLUGIN_INIT_OPTIONS) private options: ExampleOptions,
  ) {}

  findAll(
    ctx: RequestContext,
    options?: ListQueryOptions<ExampleEntity>,
    relations?: RelationPaths<ExampleEntity>,
  ): Promise<PaginatedList<ExampleEntity>> {
    return this.listQueryBuilder
      .build(ExampleEntity, options, {
        relations,
        ctx,
      })
      .getManyAndCount()
      .then(([items, totalItems]) => {
        return {
          items,
          totalItems,
        };
      });
  }

  findOne(
    ctx: RequestContext,
    id: ID,
    relations?: RelationPaths<ExampleEntity>,
  ): Promise<ExampleEntity | null> {
    return this.connection.getRepository(ctx, ExampleEntity).findOne({
      where: { id },
      relations,
    });
  }

  async create(
    ctx: RequestContext,
    input: CreateExampleEntityInput,
  ): Promise<ExampleEntity> {
    const newEntity = await this.connection
      .getRepository(ctx, ExampleEntity)
      .save(input);
    await this.customFieldRelationService.updateRelations(
      ctx,
      ExampleEntity,
      input,
      newEntity,
    );
    return assertFound(this.findOne(ctx, newEntity.id));
  }

  async update(
    ctx: RequestContext,
    input: UpdateExampleEntityInput,
  ): Promise<ExampleEntity> {
    const entity = await this.connection.getEntityOrThrow(
      ctx,
      ExampleEntity,
      input.id,
    );
    const updatedEntity = patchEntity(entity, input);
    await this.connection
      .getRepository(ctx, ExampleEntity)
      .save(updatedEntity, { reload: false });
    await this.customFieldRelationService.updateRelations(
      ctx,
      ExampleEntity,
      input,
      updatedEntity,
    );
    return assertFound(this.findOne(ctx, updatedEntity.id));
  }

  async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
    const entity = await this.connection.getEntityOrThrow(
      ctx,
      ExampleEntity,
      id,
    );
    try {
      await this.connection.getRepository(ctx, ExampleEntity).remove(entity);
      return {
        result: DeletionResult.DELETED,
      };
    } catch (e: any) {
      return {
        result: DeletionResult.NOT_DELETED,
        message: e.toString(),
      };
    }
  }
}
