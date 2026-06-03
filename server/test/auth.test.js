import request from "supertest";
import app from "../app.js";

describe("Auth Routes", () => {
  describe("POST /auth/register", () => {
    it("should register a new user", async () => {
      const userData = {
        username: "Danyal",
        email: "danyal@test.com",
        password: "123456",
      };
      const res = await request(app).post("/auth/register").send(userData);

      expect(res.statusCode).toBe(201);

      expect(res.body).toMatchObject({
        success: true,
        message:
          "Account created. Please verify your account with the OTP send to your email",
      });
    });

    it("should not allow duplicate email", async () => {
      const userData = {
        username: "Danyal",
        email: "danyal@test.com",
        password: "123456",
      };

      // first registration
      await request(app).post("/auth/register").send(userData);

      // second registration
      const res = await request(app).post("/auth/register").send(userData);

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "An account with this email already exists",
      });
    });
  });

  describe("POST /auth/login", () => {
    const loginData = {
      username: "Danyal",
      email: "danyal@test.com",
      password: "123456",
    };

    beforeEach(async () => {
      await request(app).post("/auth/register").send(loginData);
    });

    it("should login an existing user", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: loginData.email, password: loginData.password });

      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        success: true,
        message: `Welcome back ${loginData.username}`,
        user: {
          username: loginData.username,
          email: loginData.email,
          isAccountVerified: false,
        },
      });
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should reject login with wrong password", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: loginData.email, password: "wrongpass" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        message: "Wrong email or password",
      });
    });

    it("should reject login for unknown email", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: "unknown@test.com", password: loginData.password });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        message: "Wrong email or password",
      });
    });
  });
});
