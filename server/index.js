require('dotenv').config()
let supertokens = require("supertokens-node");
const express = require("express");
let Session = require("supertokens-node/recipe/session");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let { Github } = ThirdPartyEmailPassword;
const cors = require("cors");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");


supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI:
      process.env.CONNECTION_URI,
    apiKey: process.env.API_KEY,
  },
  appInfo: {
    appName: "My Awesome App", // TODO: Name of your application,
    apiDomain: "http://localhost:8080", // TODO: URL of the API domain, without any path,
    websiteDomain: "http://localhost:3000", // TODO: URL of the website domain, without any path,
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      providers: [
        Github({ 
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          clientId: process.env.GITHUB_CLIENT_ID ,
        }),
      ],
    }),
    Session.init(), 
  ],
});

let app = express();

// ...other middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(middleware());

// ...your API routes

app.get("/api", verifySession(), (req, res) => {
  let userId = req.session.getUserId();
  res.send({currentUserId: userId})
});

app.use(errorHandler())


app.listen(8080, () => {
  console.log("Server started on port 8080");
});
