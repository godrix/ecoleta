import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('facebookId').notNullable();
    table.string('userPicture');
    table.timestamp('created_at', { useTz: true });
    table.timestamp('updated_at', { useTz: true });
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
