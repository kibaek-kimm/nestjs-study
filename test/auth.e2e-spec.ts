/* eslint-disable prettier/prettier */
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("Authentication System", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("handles a signup request", () => {
    const email = "asdf@asdf.com";
    
    return request(app.getHttpServer())
      .post("/auth/signup")
      .send({ email, password: "asdfasdpsasword" })
      .expect(201)
      .then((res) => {
        const { id, email: _email } = res.body;
        expect(id).toBeDefined();
        expect(_email).toEqual(email);
      })
  });

  it("signup as a new user the get the currently logged in user", async () => {
    const email = "asdf@asdf.com";
    const res = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ email, password: "asdf" })
      .expect(201)

      const cookie = res.get("Set-Cookie");
      console.log(cookie);
      
      const { body } = await request(app.getHttpServer())
        .get("/auth/whoami")
        .set("Cookie", cookie)
        .expect(200)

      expect(body.email).toEqual(email);
  });
});
