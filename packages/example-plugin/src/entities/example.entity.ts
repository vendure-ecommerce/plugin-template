import {
    DeepPartial,
    HasCustomFields,
    VendureEntity
} from '@vendure/core';
import { Column, Entity } from 'typeorm';

export class ExampleEntityCustomFields {}

/**
 * This is an example entity which demonstrates how a new database entity
 * is defined.
 */
@Entity()
export class ExampleEntity extends VendureEntity implements HasCustomFields {
    constructor(input?: DeepPartial<ExampleEntity>) {
        super(input);
    }

    @Column()
    code: string;

    @Column(type => ExampleEntityCustomFields)
    customFields: ExampleEntityCustomFields;
}
