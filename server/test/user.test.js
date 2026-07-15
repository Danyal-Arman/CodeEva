import request from "supertest";
import app from "../app.js";
import { User } from "../models/user.model.js";
import { Room } from "../models/room.model.js";
import jwt from "jsonwebtoken";

const createAuthCookie = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  return [`token=${token}`];
};

describe("User Routes", () => {
  let authCookie;
  let user;

  beforeEach(async () => {
    user = await User.create({
      username: "UserOne",
      email: "userone@test.com",
      password: "123456",
      isAccountVerified: true,
    });
    authCookie = createAuthCookie(user);
  });

  it("GET /user should return the authenticated user", async () => {
    const res = await request(app).get("/user").set("Cookie", authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toMatchObject({
      email: user.email,
      username: user.username,
    });
  });

  it("PUT /user/profile should update profile fields", async () => {
    const res = await request(app)
      .put("/user/profile")
      .set("Cookie", authCookie)
      .send({ username: "UpdatedUser", bio: "Hello there", website: "https://example.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toMatchObject({
      username: "UpdatedUser",
      bio: "Hello there",
      website: "https://example.com",
    });
  });

  it("GET /user/stats should return created and collaboration counts", async () => {
    await Room.create({
      roomId: "room-1",
      createdBy: user._id,
      participants: [{ userId: user._id, role: "admin" }],
    });

    const collaborator = await User.create({
      username: "Collaborator",
      email: "collab@test.com",
      password: "123456",
      isAccountVerified: true,
    });

    await Room.create({
      roomId: "room-2",
      createdBy: collaborator._id,
      participants: [{ userId: user._id, role: "editor" }],
    });

    const res = await request(app).get("/user/stats").set("Cookie", authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.stats).toEqual({ created: 1, collaborations: 1 });
  });
});
