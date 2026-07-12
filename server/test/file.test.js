import request from "supertest";
import app from "../app.js";
import { User } from "../models/user.model.js";
import { Room } from "../models/room.model.js";
import { File } from "../models/file.model.js";
import jwt from "jsonwebtoken";

const createAuthCookie = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  return [`token=${token}`];
};

describe("File Routes", () => {
  let authCookie;
  let room;
  let user;

  beforeEach(async () => {
    user = await User.create({
      username: "FileOwner",
      email: "fileowner@test.com",
      password: "123456",
      isAccountVerified: true,
    });

    authCookie = createAuthCookie(user);

    room = await Room.create({
      roomId: "file-room-test",
      createdBy: user._id,
      participants: [{ userId: user._id, role: "admin" }],
    });
  });

  it("POST /file/create/:roomId should create a file", async () => {
    const res = await request(app)
      .post(`/file/create/${room.roomId}`)
      .set("Cookie", authCookie)
      .send({
        name: "main.js",
        type: "file",
        room: room._id,
        language: "javascript",
        content: "console.log('hello');",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("main.js");
    expect(res.body.room.toString()).toBe(room._id.toString());
  });

  it("GET /file/get-files/:roomId should list files for room", async () => {
    await File.create({
      name: "index.js",
      type: "file",
      room: room._id,
      content: "const x = 1;",
    });

    const res = await request(app)
      .get(`/file/get-files/${room.roomId}`)
      .set("Cookie", authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("index.js");
  });

  it("GET /file/get-files/:roomId/:fileId should return a single file", async () => {
    const file = await File.create({
      name: "app.js",
      type: "file",
      room: room._id,
      content: "const y = 2;",
    });

    const res = await request(app)
      .get(`/file/get-files/${room.roomId}/${file._id}`)
      .set("Cookie", authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.file.name).toBe("app.js");
  });
});
