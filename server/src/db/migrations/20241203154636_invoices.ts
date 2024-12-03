import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("invoices", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    
    // Reference to order_article
    table
      .uuid("order_article_id")
      .notNullable()
      .references("id")
      .inTable("order_article")
      .onDelete("CASCADE");
    
    // Reference to user
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // Invoice specific fields
    table.string("invoice_number").unique().notNullable();
    table.decimal("amount", 10, 2).notNullable();
    table.integer("quantity").unsigned().notNullable();
    table.text("description").notNullable();
    
    // Payment and status tracking
    table.string("payment_status").defaultTo("Pending");
    table.timestamp("payment_date").nullable();
    table.string("payment_method").nullable();
    table.string("transaction_id").nullable();

    // Billing details
    table.string("billing_email").nullable();
    table.string("billing_name").nullable();
    table.string("billing_address").nullable();

    // Timestamps
    table.timestamps(true, true);
  });

  // Create a trigger function to generate invoice
  await knex.raw(`
    CREATE OR REPLACE FUNCTION create_invoice_after_order()
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO invoices (
        order_article_id,
        user_id,
        invoice_number,
        amount,
        quantity,
        description,
        payment_status
      )
      VALUES (
        NEW.id,
        NEW.user_id,
        'INV-' || to_char(CURRENT_TIMESTAMP, 'YYYYMMDD') || '-' || substr(md5(random()::text), 1, 6),
        NEW.cost * NEW.quantity,
        NEW.quantity,
        NEW.description,
        CASE 
          WHEN NEW.is_paid = true THEN 'Paid'
          ELSE 'Pending'
        END
      );
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // Create the trigger
  await knex.raw(`
    CREATE TRIGGER trigger_create_invoice
    AFTER INSERT ON order_article
    FOR EACH ROW
    EXECUTE FUNCTION create_invoice_after_order();
  `);
}

export async function down(knex: Knex): Promise<void> {
  // Drop trigger first
  await knex.raw(`DROP TRIGGER IF EXISTS trigger_create_invoice ON order_article`);
  
  // Drop function
  await knex.raw(`DROP FUNCTION IF EXISTS create_invoice_after_order`);
  
  // Drop table
  await knex.schema.dropTableIfExists("invoices");
}