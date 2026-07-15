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

describe("Room Routes", () => {
  let authCookie;
  let user;

  beforeEach(async () => {
    user = await User.create({
      username: "RoomOwner",
      email: "roomowner@test.com",
      password: "123456",
      isAccountVerified: true,
    });
    authCookie = createAuthCookie(user);
  });

  it("POST /room/create should create a room for an authenticated verified user", async () => {
    const res = await request(app).post("/room/create").set("Cookie", authCookie);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Room created succesfully");
    expect(res.body.room.createdBy).toBeDefined();
  });

  it("POST /room/join should join an existing room", async () => {
    const room = await Room.create({
      roomId: "room-join-test",
      createdBy: user._id,
      participants: [{ userId: user._id, role: "admin" }],
    });

    const res = await request(app)
      .post("/room/join")
      .set("Cookie", authCookie)
      .send({ roomId: room.roomId });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("joined the room successfully");
  });

  it("GET /room/get-room/:roomId should return room details", async () => {
    const room = await Room.create({
      roomId: "room-details-test",
      createdBy: user._id,
      participants: [{ userId: user._id, role: "admin" }],
    });

    const res = await request(app).get(`/room/get-room/${room.roomId}`).set("Cookie", authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.roomId).toBe(room.roomId);
  });
});
