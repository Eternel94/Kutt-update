/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.boolean('verified').defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('links', table => {
    table.increments('id').primary();
    table.string('target').notNullable();
    table.string('short').unique().notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.boolean('banned').defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('domains', table => {
    table.increments('id').primary();
    table.string('address').notNullable().unique();
    table.boolean('homepageRedirect').defaultTo(false);
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('domains');
  await knex.schema.dropTableIfExists('links');
  await knex.schema.dropTableIfExists('users');
};
