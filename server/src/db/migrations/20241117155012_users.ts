// src/migrations/[timestamp]_create_users_table.ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("username").notNullable().unique();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.float("balance").defaultTo(0);
        table.string("profile_pic").nullable();
        table
            .uuid("role_id")
            .notNullable()
            .references("id")
            .inTable("roles")
            .onDelete("CASCADE");
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users");
}
