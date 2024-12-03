import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("order_article", (table) => {
    // Add the new column
    table
      .string("content_type")
      .defaultTo("Article") 
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("order_article", (table) => {
    // Remove the column
    table.dropColumn("content_type");
  });
}
