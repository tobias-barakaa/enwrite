import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("article_upload", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    
        // Reference to order_article
        table
          .uuid("order_article_id")
          .notNullable()
          .references("id")
          .inTable("order_article")
          .onDelete("CASCADE");
        table
      .uuid("recipient_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
      table.uuid("uploaded_by")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
        table.string('file_url', 255).notNullable();
        table.string('public_id', 255).notNullable();
        table.string('status').notNullable().defaultTo('Processing');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
})

}



export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("article_upload");
  }
  
