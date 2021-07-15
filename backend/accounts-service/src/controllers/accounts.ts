import { Request, Response } from "express";
import { IAccount } from "../models/account";
import AccountRepository, { AccountModel } from "../models/accountModel";

const accounts: IAccount[] = [];

async function getAccounts(req: Request, res: Response, next: any) {
  //com findall traz tudo o que está na tabela de account
  const accounts = await AccountRepository.findAll<AccountModel>();

  //ajuste de segurança

  res.json(
    accounts.map((item) => {
      item.password = "";
      return item;
    })
  );
}

function getAccount(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) throw new Error("ID em formato inválido");

    //posso usar esse tbm:
    //if(!id) return res.status(404).end();
    const index = accounts.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).end();
    } else {
      return res.json(accounts[index]);
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

function addAccounts(req: Request, res: Response, next: any) {
  try {
    const newAccount = req.body as IAccount;
    accounts.push(newAccount);
    res.status(201).json(newAccount);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

function setAccount(req: Request, res: Response, next: any) {
  try {
    const accountId = parseInt(req.params.id);
    if (!accountId) throw new Error("ID em formato inválido");

    const accountParams = req.body as IAccount;
    const index = accounts.findIndex((item) => item.id === accountId);
    const originalAccount = accounts[index];

    if (index === -1) return res.status(404).end();

    if (accountParams.name) originalAccount.name = accountParams.name;
    if (accountParams.password)
      originalAccount.password = accountParams.password;

    accounts[index] = originalAccount;
    res.status(200).json(originalAccount);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

function loginAccount(req: Request, res: Response, next: any) {
  try {
    const loginParams = req.body as IAccount;
    const index = accounts.findIndex(
      (item) =>
        item.email === loginParams.email &&
        item.password === loginParams.password
    );
    if (index === -1) return res.status(401);

    res.json({ auth: true, token: {} });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

function logoutAccount(req: Request, res: Response, next: any) {
  res.json({ auth: false, token: null });
}

export default {
  getAccounts,
  addAccounts,
  getAccount,
  setAccount,
  loginAccount,
  logoutAccount,
};
