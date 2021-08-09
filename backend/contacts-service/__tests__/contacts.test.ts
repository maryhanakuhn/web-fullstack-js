import request from "supertest";
import app from "./../src/app";
import accountsApp from "../../accounts-service/src/app";
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";
import { IContact } from "../src/models/contact";
import repository from "../src/models/contactRepository";

const testEmail = "jest@accounts.com";
const testEmail2 = "jest2@accounts.com";
const testPassword = "123456;";
let jwt: string = "";
let testAccountId: number = 0;
let testContactId: number = 0;

beforeAll(async () => {
  const testAccount = {
    name: "Jest",
    email: testEmail,
    password: testPassword,
    domain: "jest.com",
  };
  const account = await request(accountsApp)
    .post("/accounts/")
    .send(testAccount);
  testAccountId = account.body.id;
  const result = await request(accountsApp)
    .post("/accounts/login")
    .send({ email: testEmail, password: testPassword });
  jwt = result.body.token;
});

afterAll(async () => {
  await request(accountsApp).post("/accounts/logout").send();
  await request(accountsApp).delete("/accounts/" + testAccountId);
});

describe("Testando rotas do contacts", () => {
  it("GET /contacts/ - Deve retornar statusCode 200", async () => {
    const resultado = await request(app)
      .get("/contacts/")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(200);
    expect(Array.isArray(resultado.body)).toBeTruthy();
    
    it("GET /contacts/:id - Deve retornar statusCode 200", async () => {
      const resultado = await request(app)
        .get("/contacts/")
        .set("x-access-token", jwt);
  
      expect(resultado.status).toEqual(200);
      expect(resultado.body.id).toEqual(testContactId);
  });

  /* it("POST /accounts/ - Deve retornar statusCode 201", async () => {
    const payload: IAccount = {
      name: "Jest2",
      email: testEmail2,
      password: "123456",
      domain: "jest.com",
    };

    const resultado = await request(app).post("/accounts/").send(payload);

    expect(resultado.status).toEqual(201);
    expect(resultado.body.id).toBeTruthy();
  });

   it("POST /accounts/ - Deve retornar statusCode 422", async () => {
    const payload = {
      street: "rua Edite",
      city: "Arroio do meio",
      state: "RS",
    };

    const resultado = await request(app).post("/accounts/").send(payload);

    expect(resultado.status).toEqual(422);
  });

  it("PATCH /accounts/:id - Deve retornar statusCode 200", async () => {
    const payload = {
      name: "Maryhana Kuhn",
    };

    const resultado = await request(app)
      .patch("/accounts/" + testId)
      .send(payload)
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(200);
    expect(resultado.body.id).toEqual(testId);
    expect(resultado.body.name).toEqual(payload.name);
  });

  it("PATCH /accounts/:id - Deve retornar statusCode 400", async () => {
    const payload = {
      name: "Maryhana Kuhn",
    };

    const resultado = await request(app)
      .patch("/accounts/abc")
      .send(payload)
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(400);
  });

  it("PATCH /accounts/:id - Deve retornar statusCode 404", async () => {
    const payload = {
      name: "Maryhana Kuhn",
    };

    const resultado = await request(app)
      .patch("/accounts/-1")
      .send(payload)
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(404);
  });

  it("GET /accounts/:id - Deve retornar statusCode 200", async () => {
    const resultado = await request(app)
      .get("/accounts/" + testId)
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(200);
    expect(resultado.body.id).toBe(testId);
  });

  it("GET /accounts/:id - Deve retornar statusCode 404", async () => {
    const resultado = await request(app)
      .get("/accounts/-1")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(404);
  });

  it("GET /accounts/:id - Deve retornar statusCode 400", async () => {
    const resultado = await request(app)
      .get("/accounts/asds")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(400);
  });*/
});
