import request from "supertest";
import app from "./../src/app";
import { Response } from "express";
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";

describe("Testando rotas do accounts", () => {
  it("GET /accounts/ - Deve retornar statusCode 200", async () => {
    const resultado = await request(app).get("/accounts");

    expect(resultado.status).toEqual(200);
    expect(Array.isArray(resultado.body)).toBeTruthy();
  });

  it("POST /accounts/ - Deve retornar statusCode 201", async () => {
    const payload = {
      id: 1,
      name: "Maryhana",
      email: "maryhanakuhn@gmail.com",
      password: "123456",
      status: 100,
    };

    const resultado = await request(app).post("/accounts").send(payload);

    expect(resultado.status).toEqual(201);
    expect(resultado.body.id).toBe(1);
  });

  it("POST /accounts/ - Deve retornar statusCode 422", async () => {
    const payload = {
      id: 1,
      streer: "rua Edite",
      city: "Arroio do meio",
      state: "RS",
    };

    const resultado = await request(app).post("/accounts").send(payload);

    expect(resultado.status).toEqual(422);
  });

  
  
  
  it("PATCH /accounts/:id - Deve retornar statusCode 200", async () => {
    const payload = {
      name: "Maryhana Kuhn",
      email: "maryhanakuhn@gmail.com",
      password: "123456789",
    };

    const resultado = await request(app)
    .patch("/accounts/1")
    .send(payload);
    expect(resultado.status).toEqual(200);
    expect(resultado.body.id).toEqual(1);
  });

  it("PATCH /accounts/:id - Deve retornar statusCode 400", async () => {
    const payload = {
      name: "Maryhana Kuhn",
      email: "maryhanakuhn@gmail.com",
      password: "123456789",
    };

    const resultado = await request(app)
    .patch("/accounts/abc")
    .send(payload);

    expect(resultado.status).toEqual(400);
  });

  it("PATCH /accounts/:id - Deve retornar statusCode 404", async () => {
    const payload = {
      name: "Maryhana Kuhn",
      email: "maryhanakuhn@gmail.com",
      password: "123456789",
    };

    const resultado = await request(app).patch("/accounts/-1").send(payload);

    expect(resultado.status).toEqual(404);
  });

  it("GET /accounts/:id - Deve retornar statusCode 200", async () => {
    const resultado = await request(app).get("/accounts/1");

    expect(resultado.status).toEqual(200);
    expect(resultado.body.id).toBe(1);
  });

  it("GET /accounts/:id - Deve retornar statusCode 404", async () => {
    const resultado = await request(app).get("/accounts/2");

    expect(resultado.status).toEqual(404);
  });

  it("GET /accounts/:id - Deve retornar statusCode 400", async () => {
    const resultado = await request(app).get("/accounts/asds");

    expect(resultado.status).toEqual(400);
  });
});
