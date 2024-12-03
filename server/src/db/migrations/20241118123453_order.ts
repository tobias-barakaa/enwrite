import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("order", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
                table
            .uuid("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE"); 
                table.string("paypal_transaction_id").nullable();
        table.string("paypal_payer_id").nullable();
        table.string("payer_email").nullable();
        table.decimal("paypal_amount", 10, 2).nullable();
        table.decimal("cost", 10, 2).notNullable().defaultTo(0);
        table
            .enu("status", ["Pending", "Completed", "Failed", "Refunded"])
            .defaultTo("Pending");
        table.boolean("is_paid").defaultTo(false);
        table.timestamps(true, true); 
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("order");
}
