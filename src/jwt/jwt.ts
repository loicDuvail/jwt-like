import { symetricDecrypt, symetricEncrypt, timeStringToInt } from "./util";
import * as sha256 from "sha256";

type JwtSignOptions = { expiresIn: string };
export const sign = (data: object, options: JwtSignOptions, secret: string) => {
  const hash = sha256(secret, { asString: true });
  const prefix = symetricEncrypt(hash, secret);
  const encryptedData = symetricEncrypt(JSON.stringify(data), secret);
  const encryptedDate = symetricEncrypt(new Date().toUTCString(), secret);
  const encryptedExpiresIn = symetricEncrypt(options.expiresIn, secret);

  return (
    prefix +
    "." +
    encryptedData +
    "." +
    encryptedDate +
    "." +
    encryptedExpiresIn
  );
};

export const verify = (token: string, secret: string) => {
  const [prefix, encryptedData, encryptedDate, encryptedLifetimeMs] =
    token.split(".");

  if (symetricDecrypt(prefix, secret) !== sha256(secret, { asString: true }))
    return { status: 403, message: "invalid token", data: null };

  const expiresIn = symetricDecrypt(encryptedLifetimeMs, secret);
  const { data: lifetime, status } = timeStringToInt(expiresIn);

  if (status !== 200)
    return { status: 403, message: "invalid expire format", data: null };

  const date = symetricDecrypt(encryptedDate, secret);
  const time = Date.parse(date);

  if (time + lifetime < new Date().getTime())
    return { status: 401, message: "expired token", data: null };

  const data = JSON.parse(symetricDecrypt(encryptedData, secret));

  return { status: 200, message: "valid token", data };
};
