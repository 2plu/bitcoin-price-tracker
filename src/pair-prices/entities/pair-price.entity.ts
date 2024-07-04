import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class PairPrice {
  @PrimaryKey()
  id!: number;

  @Property()
  timestamp: Date;

  @Property()
  price: number;
}
