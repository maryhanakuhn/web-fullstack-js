import { Request, Response } from "express";
import repository from "../models/contactRepository"

async function getContacts(req: Request, res: Response, next: any) {
  repository.findAll()
}

export default {getContacts}
