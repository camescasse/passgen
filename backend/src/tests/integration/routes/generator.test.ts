import request from "supertest";
import { describe, expect, it } from "vitest";
import server from "../../../app";
import { PasswordOptions } from "../../../models/passwordOptions";

describe("/api/generator", () => {
  describe("POST /", async () => {
    let options: PasswordOptions = {};

    const exec = () => {
      return request(server).post("/api/generator").send(options);
    };

    it("should return 400 given invalid password parameters and valid length", async () => {
      options.length = 8;
      options.lowercase = false;
      options.uppercase = false;
      options.numbers = false;
      options.symbols = false;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 given invalid password parameters and length", async () => {
      options.length = 1;
      options.lowercase = false;
      options.uppercase = false;
      options.numbers = false;
      options.symbols = false;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return a password given valid generation parameters", async () => {
      options.length = 8;
      options.lowercase = true;
      options.uppercase = true;
      options.numbers = true;
      options.symbols = true;

      const res = await exec();

      expect(res.status).toBe(200);
    });
  });
});
