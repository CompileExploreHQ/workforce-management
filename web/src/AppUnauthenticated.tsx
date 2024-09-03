import * as React from "react";
import { Loading } from "./components/Loading";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

const AppUnauthenticated: React.FC = () => {
  return (
    <React.Suspense fallback={<Loading isCenter />}>
      <Switch>
        <Route path="/login" render={() => <LoginPage />} />
        <Route path="/register" render={() => <RegisterPage />} />
        <Route path="/" exact render={() => <Redirect to="/login" />} />
        <Route render={() => <Redirect to="/login" />} />
      </Switch>
    </React.Suspense>
  );
};

export default AppUnauthenticated;
