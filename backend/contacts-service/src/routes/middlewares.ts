import { Request, Response } from "express";
import { contactSchema, contactUpdateSchema } from "../models/contactSchemas";
import commonsMiddleware from "ms-commons/api/routes/middlewares";

function validateContactSchema(req: Request, res: Response, next: any) {
  return commonsMiddleware.validateSchema(contactSchema, req, res, next);
}

function validateUpdateContactSchema(req: Request, res: Response, next: any) {
  return commonsMiddleware.validateSchema(contactUpdateSchema, req, res, next);
}

export { validateContactSchema, validateUpdateContactSchema };
