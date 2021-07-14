"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const soma_1 = require("../src/soma");
describe("Testando a função de soma", () => {
    it("shouldtestando soma de 1+2, deve ser 3", () => {
        const resultado = soma_1.soma(1, 2);
        expect(resultado).toEqual(3);
    });
});
