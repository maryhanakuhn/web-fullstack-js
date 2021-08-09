import { Request, Response } from "express";
import Joi from "joi";
import {
  accountSchema,
  loginSchema,
  accountUpdateSchema,
} from "../models/accountSchemas";
import commonsMiddleware from "ms-commons/api/routes/middlewares";
import { Token } from "ms-commons/api/auth";
import controllerCommons from "ms-commons/api/controllers/controller";

function validateAccountSchema(req: Request, res: Response, next: any) {
  return commonsMiddleware.validateSchema(accountSchema, req, res, next);
}

function validateUpdateAccountSchema(req: Request, res: Response, next: any) {
  return commonsMiddleware.validateSchema(accountUpdateSchema, req, res, next);
}

function validateLoginSchema(req: Request, res: Response, next: any) {
  return commonsMiddleware.validateSchema(loginSchema, req, res, next);
}

async function validateAuthentication(req: Request, res: Response, next: any) {
  return commonsMiddleware.validateAuth(req, res, next);
}

function validateAuthorization(req: Request, res: Response, next: any) {
  const accountId = parseInt(req.params.id, 10);
  if (!accountId) return res.status(400).end();

  const token = controllerCommons.getToken(res) as Token;
  if (accountId !== token.accountId) return res.status(403).end();

  next();
}

export {
  validateAccountSchema,
  validateAuthorization,
  validateLoginSchema,
  validateUpdateAccountSchema,
  validateAuthentication
  
};
