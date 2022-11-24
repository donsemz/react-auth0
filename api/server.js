const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { expressjwt: expressJwt } = require("express-jwt");
const jwks = require("jwks-rsa");

const app = express();
app.use(cors()); // to allow cross origin requests from different ports

//create middleware to verify jwt
const jwtCheck = expressJwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-p7j2vojjf8zbvxon.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "my identifier",
  issuer: "https://dev-p7j2vojjf8zbvxon.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ["/"] });

app.use(jwtCheck);

app.get("/", (req, res) => {
  res.send("Im in the Index route");
});

app.get("/protected", async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const response = await axios.get('https://dev-p7j2vojjf8zbvxon.us.auth0.com/userinfo',{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    });
    const userinfo = response.data;
    console.log(userinfo);
    res.send(userinfo);

  } catch (error) { res.send(error.message)}
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.status(status).send(message);
});

app.listen(4000, () => {
  console.log("Listening on Port 4000");
});
