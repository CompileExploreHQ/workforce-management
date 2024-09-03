import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Loading } from "./components/Loading";
import { ApiClientProvider } from "./context/ApiClientProvider";
// import { CurrentUserProvider } from "./context/CurrentUserProvider";
// import { PreferencesProvider } from "./context/PreferencesProvider";

const DashboardPage = React.lazy(async () => import("./pages/Dashboard"));
const NotFoundPage = React.lazy(async () => import("./pages/NotFound"));

const AppAuthenticated: React.FC = () => {
  return (
    <ApiClientProvider>
      {/* <CurrentUserProvider>
        <PreferencesProvider> */}
      <Layout>
        <React.Suspense fallback={<Loading isCenter />}>
          <Switch>
            <Route path="/dashboard" render={() => <DashboardPage />} />
            <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
            <Route render={() => <NotFoundPage />} />
          </Switch>
        </React.Suspense>
      </Layout>
      {/* </PreferencesProvider>
      </CurrentUserProvider> */}
    </ApiClientProvider>
  );
};

export default AppAuthenticated;
