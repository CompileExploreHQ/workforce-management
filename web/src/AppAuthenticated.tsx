import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Loading } from "./components/Loading";
import { ApiClientProvider } from "./context/ApiClientProvider";
import { CurrentUserProvider } from "./context/CurrentUserProvider";

const DashboardPage = React.lazy(async () => import("./pages/Dashboard"));
const ProfilePage = React.lazy(async () => import("./pages/Profile"));
const WorkspacePage = React.lazy(async () => import("./pages/Workspace"));
const AdminPage = React.lazy(async () => import("./pages/Admin"));
const NotFoundPage = React.lazy(async () => import("./pages/NotFound"));

const AppAuthenticated: React.FC = () => {
  return (
    <ApiClientProvider>
      <CurrentUserProvider>
        <Layout>
          <React.Suspense fallback={<Loading isCenter />}>
            <Switch>
              <Route path="/dashboard" render={() => <DashboardPage />} />
              <Route path="/profile" render={() => <ProfilePage />} />
              <Route path="/workspace" render={() => <WorkspacePage />} />
              <Route path="/admin" render={() => <AdminPage />} />
              <Route
                path="/"
                exact
                render={() => <Redirect to="/dashboard" />}
              />
              <Route render={() => <NotFoundPage />} />
            </Switch>
          </React.Suspense>
        </Layout>
      </CurrentUserProvider>
    </ApiClientProvider>
  );
};

export default AppAuthenticated;
