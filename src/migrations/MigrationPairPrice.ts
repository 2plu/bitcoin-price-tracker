import { Migration } from '@mikro-orm/migrations';

export class MigrationPairPrice extends Migration {
  async up(): Promise<void> {
    this.addSql('create table "pair_price" (' +
      '"id" serial primary key, ' +
      '"timestamp" timestamptz not null, ' +
      '"price" double precision not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "pair_price";');
  }
}
