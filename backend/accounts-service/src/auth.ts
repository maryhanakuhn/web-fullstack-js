import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import authCommons, {Token} from "ms-commons/api/auth"

const privateKey = fs.readFileSync("./keys/private.key", "utf8");
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
const jwtAlgorithm = "RS256";

function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password: string, hashPassword: string) {
  return bcrypt.compareSync(password, hashPassword);
}

//função pra assinar um token
function sign(accountId: number) {
  const token: Token = { accountId };
  return jwt.sign(token, privateKey, {
    expiresIn: jwtExpires,
    algorithm: jwtAlgorithm,
  });
}

async function verify(token: string) {
  return authCommons.verify(token)
}

export default { hashPassword, comparePassword, sign, verify };
