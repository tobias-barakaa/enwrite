import db from "../../db/db";

beforeAll(async () => {
    await db.migrate.latest(); 
    await db.seed.run(); 
  });
  
  afterEach(async () => {
    await db('users').truncate();
  });
  
  afterAll(async () => {
    await db.destroy(); 
  });