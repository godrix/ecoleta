import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('pointsItems', table => {
    table.increments('id').primary();
    table
      .integer('collectionPointsId')
      .notNullable()
      .references('id')
      .inTable('collectionPoints');
    table
      .integer('collectionItemsId')
      .notNullable()
      .references('id')
      .inTable('collectionItems');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('pointsItems');
}
