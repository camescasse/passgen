import request from "supertest";
import { describe, expect, it } from "vitest";
import server from "../../../app";

describe("prod middleware", () => {
  describe("GET /", () => {
    const exec = () => {
      return request(server).get("/").set("Origin", "https://example.com");
    };

    it("should set the helmet security headers", async () => {
      const res = await exec();

      expect(res.headers["x-content-type-options"]).toBe("nosniff");
    });

    it("should not send the x-powered-by header", async () => {
      const res = await exec();

      expect(res.headers["x-powered-by"]).toBeUndefined();
    });

    it("should allow requests from all origins", async () => {
      const res = await exec();

      expect(res.headers["access-control-allow-origin"]).toBe("*");
    });
  });
});
