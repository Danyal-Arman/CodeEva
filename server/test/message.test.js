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

describe("Message Routes", () => {
  let authCookie;
  let room;
  let user;

  beforeEach(async () => {
    user = await User.create({
      username: "Messager",
      email: "messager@test.com",
      password: "123456",
      isAccountVerified: true,
    });
    authCookie = createAuthCookie(user);
    room = await Room.create({
      roomId: "message-room-test",
      createdBy: user._id,
      participants: [{ userId: user._id, role: "admin" }],
    });
  });

  it("POST /room/messages/create/:roomId should create a chat message", async () => {
    const res = await request(app)
      .post(`/room/messages/create/${room.roomId}`)
      .set("Cookie", authCookie)
      .send({ message: "hello there" });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.newMessage.message).toBe("hello there");
  });

  it("GET /room/messages/:roomId should return chat messages", async () => {
    await request(app)
      .post(`/room/messages/create/${room.roomId}`)
      .set("Cookie", authCookie)
      .send({ message: "first message" });

    const res = await request(app).get(`/room/messages/${room.roomId}`).set("Cookie", authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.messages).toHaveLength(1);
  });
});
