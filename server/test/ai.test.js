import request from "supertest";
import app from "../app.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

jest.mock("../services/together.service.js", () => ({
  askGroqAI: jest.fn().mockResolvedValue("mocked ai response"),
}));

jest.mock("../services/groqSummarization.service.js", () => ({
  groqCodeSummarizationApi: jest.fn().mockResolvedValue("mocked summary"),
}));

const createAuthCookie = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  return [`token=${token}`];
};

describe("AI Routes", () => {
  let authCookie;
  let user;

  beforeEach(async () => {
    user = await User.create({
      username: "AIUser",
      email: "aiuser@test.com",
      password: "123456",
      isAccountVerified: true,
    });
    authCookie = createAuthCookie(user);
  });

  it("POST /ai/assistant should return an AI reply", async () => {
    const res = await request(app)
      .post("/ai/assistant")
      .set("Cookie", authCookie)
      .send({ entireChatMessages: [{ role: "user", content: "hello" }] });

    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toBe("mocked ai response");
  });

  it("POST /ai/code-summarization should return a summary reply", async () => {
    const res = await request(app)
      .post("/ai/code-summarization")
      .set("Cookie", authCookie)
      .send({ entireSummarizerMessages: [{ role: "user", content: "summarize this" }] });

    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toBe("mocked summary");
  });
});
