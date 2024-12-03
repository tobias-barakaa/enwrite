import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await knex.schema.createTable("roles", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()")); 
        table.string("role_name").notNullable().unique();
        table.timestamps(true, true); 
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("roles");
}
