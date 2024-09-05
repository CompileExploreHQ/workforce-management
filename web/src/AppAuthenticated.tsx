import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Loading } from "./components/Loading";
import { ApiClientProvider } from "./context/ApiClientProvider";
import { CurrentUserProvider } from "./context/CurrentUserProvider";
import { useAccessZones } from "./hooks/useAccessZones";
import { AccessZones } from "./common/AccessZones";

const DashboardPage = React.lazy(async () => import("./pages/Dashboard"));
const ProfilePage = React.lazy(async () => import("./pages/Profile"));
const WorkspacePage = React.lazy(async () => import("./pages/Workspace"));
const AdminPage = React.lazy(async () => import("./pages/Admin"));
const NotFoundPage = React.lazy(async () => import("./pages/NotFound"));

const Routes: React.FC = () => {
  const { hasZone, hasAllOfZones } = useAccessZones();

  return (
    <>
      {hasZone(AccessZones.UserRead) && (
        <Route path="/profile" render={() => <ProfilePage />} />
      )}

      {hasZone(AccessZones.WorkspaceRead) && (
        <Route path="/workspace" render={() => <WorkspacePage />} />
      )}

      {hasAllOfZones([
        AccessZones.WorkspaceCreate,
        AccessZones.WorkspaceEdit,
        AccessZones.WorkspaceRead,
      ]) && <Route path="/admin" render={() => <AdminPage />} />}

      <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
    </>
  );
};

const AppAuthenticated: React.FC = () => {
  return (
    <ApiClientProvider>
      <CurrentUserProvider>
        <Layout>
          <React.Suspense fallback={<Loading isCenter />}>
            <Switch>
              <Route path="/dashboard" render={() => <DashboardPage />} />
              <Routes />
              <Route render={() => <NotFoundPage />} />
            </Switch>
          </React.Suspense>
        </Layout>
      </CurrentUserProvider>
    </ApiClientProvider>
  );
};

export default AppAuthenticated;
