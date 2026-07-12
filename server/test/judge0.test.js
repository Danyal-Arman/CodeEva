import request from "supertest";
import app from "../app.js";

jest.mock("axios", () => ({
  post: jest.fn().mockResolvedValue({ data: { stdout: "ok" } }),
}));

describe("Judge0 Routes", () => {
  it("POST /output/run-code should return judge output", async () => {
    const res = await request(app)
      .post("/output/run-code")
      .send({ source_code: "console.log('hi')", language_id: 71 });

    expect(res.statusCode).toBe(200);
    expect(res.body.stdout).toBe("ok");
  });
});
