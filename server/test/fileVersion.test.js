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

describe("File Version Routes", () => {
  let authCookie;
  let room;
  let user;
  let file;

  beforeEach(async () => {
    user = await User.create({
      username: "VersionUser",
      email: "versionuser@test.com",
      password: "123456",
      isAccountVerified: true,
    });
    authCookie = createAuthCookie(user);
    room = await Room.create({
      roomId: "version-room-test",
      createdBy: user._id,
      participants: [{ userId: user._id, role: "admin" }],
    });
    file = await File.create({
      name: "versioned.js",
      type: "file",
      room: room._id,
      content: "const a = 1;",
    });
  });

  it("POST /file/create-version/:roomId/:fileId should create a version", async () => {
    const res = await request(app)
      .post(`/file/create-version/${room.roomId}/${file._id}`)
      .set("Cookie", authCookie)
      .send({ content: "const a = 2;" });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.newFileVersion.content).toBe("const a = 2;");
  });

  it("GET /file/all-versions/:fileId should return versions", async () => {
    await request(app)
      .post(`/file/create-version/${room.roomId}/${file._id}`)
      .set("Cookie", authCookie)
      .send({ content: "const a = 2;" });

    const res = await request(app).get(`/file/all-versions/${file._id}`).set("Cookie", authCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.fileVersions.length).toBeGreaterThan(0);
  });
});
