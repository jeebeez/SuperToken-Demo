import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import ThirdPartyEmailPassword, {
  Github,
  ThirdPartyEmailPasswordAuth,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./components/Home";


SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.io/docs/thirdpartyemailpassword/appinfo
    appName: "Favorite Quote", // TODO: Name of your application,
    apiDomain: "http://localhost:8080", // TODO: URL of the API domain, without any path,
    websiteDomain: "http://localhost:3000", // TODO: URL of the website domain, without any path,
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [Github.init()],
      },
    }),
    Session.init(),
  ],
});

const App = () => {

  return (
    <Router>
      <Switch>
        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
        <Route path="/">
          <ThirdPartyEmailPasswordAuth >
            <Home />
          </ThirdPartyEmailPasswordAuth>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
