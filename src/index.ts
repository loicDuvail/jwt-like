import jwt from "./jwt/jwt";

const SECRET = "this-is-a-secret";

const token = jwt.sign(
  { email: "duvailloic1@gmail.com" },
  { expiresIn: "2 hours" },
  SECRET
);

console.log("token: " + token);

console.log("\nverifying token");
const verif = jwt.verify(token, SECRET);
console.log(verif);
