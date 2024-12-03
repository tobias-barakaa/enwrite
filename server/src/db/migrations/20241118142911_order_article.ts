
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("order_article", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .uuid("order_id")
      .nullable()
      .references("id")
      .inTable("order")
      .onDelete("CASCADE");

    table.string("title").notNullable();
    table.text("description").notNullable();
    table.string("keywords").notNullable();
    table.string("word_count").defaultTo("300 words");
    table.string("duration").defaultTo("1 day");
    table.string("complexity").defaultTo("General");
    table.string("language").defaultTo("American English");

    table
      .integer("quantity")
      .unsigned()
      .notNullable()
      .defaultTo(1);

    table.decimal("cost", 10, 2).notNullable().defaultTo(50);

    table
      .enu("status", ["Pending", "Published", "Completed", "Processing", "Deleted", "Rejected"])
      .defaultTo("Pending");

    table.boolean("is_paid").defaultTo(false);

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("order_article");
}
