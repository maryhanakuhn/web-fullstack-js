import { Router } from "express";
import Joi from "joi";
import accountsController from "../controllers/accounts";
import { accountSchema, loginSchema } from "../models/accountSchemas";
import { validateAccount, validateLogin } from "./middlewares";

const router = Router();

router.get("/accounts/:id", accountsController.getAccount);
router.get("/accounts/", accountsController.getAccounts);

router.patch("/accounts/:id", validateAccount, accountsController.setAccount);

router.post("/accounts/", validateAccount, accountsController.addAccounts);
router.post("/accounts/login", validateLogin, accountsController.loginAccount);
router.post("/accounts/logout", accountsController.logoutAccount);

export default router;
