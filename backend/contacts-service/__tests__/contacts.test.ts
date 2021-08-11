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

  const testContact = {
    name: "jest",
    email: testEmail,
    phone: "51123456789",
  } as IContact;
  const result2 = await repository.add(testContact, testAccountId);
  testContactId = result2.id!;
});

afterAll(async () => {
  await repository.removeByEmail(testEmail, testAccountId);
  await request(accountsApp).delete("/accounts/" + testAccountId).set("x-access-token", jwt);
  await request(accountsApp).post("/accounts/logout").set("x-access-token", jwt);
});

describe("Testando rotas do contacts", () => {
  it("GET /contacts/ - Deve retornar statusCode 200", async () => {
    const resultado = await request(app)
      .get("/contacts/")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(200);
    expect(Array.isArray(resultado.body)).toBeTruthy();
  });

  it("GET /contacts/ - Deve retornar statusCode 401", async () => {
    const resultado = await request(app).get("/contacts/");

    expect(resultado.status).toEqual(401);
  });

  it("GET /contacts/:id - Deve retornar statusCode 401", async () => {
    const resultado = await request(app)
      .get("/contacts/" + testContactId)
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(200);
    expect(resultado.body.id).toEqual(testContactId);
  });

  it("GET /contacts/:id - Deve retornar statusCode 404", async () => {
    const resultado = await request(app)
      .get("/contacts/-1")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(404);
  });

  it("GET /contacts/:id - Deve retornar statusCode 400", async () => {
    const resultado = await request(app)
      .get("/contacts/abc")
      .set("x-access-token", jwt);

    expect(resultado.status).toEqual(400);
  });

  it("GET /contacts/:id - Deve retornar statusCode 401", async () => {
    const resultado = await request(app)
    .get("/contacts/" + testContactId)

    expect(resultado.status).toEqual(401);
  });
});
