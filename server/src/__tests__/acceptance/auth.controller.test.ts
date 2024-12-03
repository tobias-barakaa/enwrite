import app from "../../app";
import request from "supertest";
import knex from "../../db/db";

let appServer: any;

beforeEach(async () => {
  appServer = app.listen(0);
});

afterEach(() => {
  appServer.close();
});

it('should be no users initialy', async () => {
    const response = await request(app).post('/api/vi/users').send({
        username: 'testusername',
        email: 'emailtest@gmail.com',
        password: 'password'
    });
});

describe('User API', () => {
  // Setup types
  interface TestUser {
    username: string;
    email: string;
    password: string;
    profile_pic?: string;
  }

  // Setup before all tests
  beforeAll(async () => {
    // Ensure database is in a known state
    await knex.migrate.latest();
  });

  // Setup before each test
  beforeEach(async () => {
    // Clear tables
    await knex("users").del();
    await knex("roles").del();

    // Insert default role
    await knex("roles").insert({
      id: 1,
      role_name: "client",
      description: "Client role",
      created_at: new Date(),
    });
  });

  // Cleanup after all tests
  afterAll(async () => {
    await knex.destroy();
  });

  // Fix the initial test
  it('should create a new user successfully', async () => {
    const testUser: TestUser = {
      username: 'testusername',
      email: 'emailtest@gmail.com',
      password: 'password123'  // Make sure it meets password requirements
    };

    const response = await request(app)
      .post('/api/v1/users')  // Fix the endpoint path
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.username).toBe(testUser.username);
    expect(response.body.data.user.email).toBe(testUser.email);
  });

  it("should not create user with duplicate email", async () => {
    const testUser: TestUser = {
      username: "anotherusername",
      email: "reuse@gmail.com",
      password: "password123",
    };

    // Create first user
    const firstResponse = await request(app)
      .post("/api/v1/users")
      .send(testUser);
    
    expect(firstResponse.status).toBe(201);

    // Try to create second user with same email
    const duplicateUser: TestUser = {
      username: "testusername",
      email: "reuse@gmail.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/v1/users")
      .send(duplicateUser);

    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Email already exists.");
  });

  it("should create a user with a valid profile picture URL", async () => {
    const testUser: TestUser = {
      username: "testuser",
      email: "testuser@gmail.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/v1/users")
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.profile_pic).toContain("https://");
  });
});




