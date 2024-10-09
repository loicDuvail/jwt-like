import { sign, verify } from "./jwt/jwt";

const SECRET = "this-is-a-secret";

const token = sign(
  { email: "duvailloic1@gmail.com" },
  { expiresIn: "2 hours" },
  SECRET
);

console.log("token: " + token);

console.log("\nverifying token");
const verif = verify(token, SECRET);
console.log(verif);
