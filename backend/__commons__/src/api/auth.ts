import jwt, { VerifyOptions } from "jsonwebtoken";
import fs from "fs";
import path from "path";

const publicKey = fs.readFileSync(path.resolve(__dirname, "../../keys/public.key"), "utf8");
const jwtAlgorithm = "RS256";

export type Token = { accountId: number };

async function verify(token: string) {
  try {
    const decoded: Token = (await jwt.verify(token, publicKey, {
      algorithm: [jwtAlgorithm],
    } as VerifyOptions)) as Token;
    return { accountId: decoded.accountId };
  } catch (error) {
    console.error(`verify : ${error}`);
    return null;
  }
}

export default { verify };
