import request from "supertest";
import { describe, expect, it } from "vitest";
import server from "../../../app";
import { PasswordOptions } from "../../../models/passwordOptions";

describe("/generator", () => {
  describe("POST /", async () => {
    let options: PasswordOptions = {};

    const exec = () => {
      return request(server).post("/generator").send(options);
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

    it("should use the default options given only a length", async () => {
      const res = await request(server).post("/generator").send({ length: 16 });

      expect(res.status).toBe(200);
      expect(res.text).toHaveLength(16);
    });

    it("should return 400 given no body", async () => {
      const res = await request(server).post("/generator");

      expect(res.status).toBe(400);
    });
  });
});
