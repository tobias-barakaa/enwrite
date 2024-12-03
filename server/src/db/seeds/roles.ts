import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("roles").del();

    await knex("roles").insert([
        { id: knex.raw("uuid_generate_v4()"), role_name: "client" },
        { id: knex.raw("uuid_generate_v4()"), role_name: "writer" },
        { id: knex.raw("uuid_generate_v4()"), role_name: "admin" },
    ]);
}
