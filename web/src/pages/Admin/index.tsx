import { lazy, Suspense, useMemo } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { Workspace } from "../../components/Workspace";
import { Loading } from "../../components/Loading";

const WorkspaceListPage = lazy(async () => import("./Workspace"));
const WorkspaceDetailPage = lazy(async () => import("./Workspace/Detail"));
const EmployeePage = lazy(async () => import("./Workspace/Detail"));
const EmployeeDetailPage = lazy(async () => import("./Workspace/Detail"));

const Admin: React.FC = () => {
  const { url } = useRouteMatch();

  const workspaceItems = useMemo(() => {
    const items = [
      {
        label: "Workspaces",
        to: `${url}/workspace`,
      },
    ];

    return items;
  }, [url]);

  return (
    <Workspace
      navigation={{
        items: workspaceItems,
      }}
    >
      <Suspense fallback={<Loading isCenter />}>
        <Switch>
          <Route
            path={`${url}/workspace`}
            render={() => <WorkspaceListPage />}
          />
          <Route
            path={`${url}/workspace/:workspaceId`}
            render={() => <WorkspaceDetailPage />}
          />
          <Route
            path={`${url}/workspace/:workspaceId/employee`}
            render={() => <EmployeePage />}
          />
          <Route
            path={`${url}/workspace/:workspaceId/employee/:employeeId`}
            render={() => <EmployeeDetailPage />}
          />
          <Route render={() => <Redirect to={`${url}/workspace`} />} />
        </Switch>
      </Suspense>
    </Workspace>
  );
};

const AdminPage = () => <Admin />;

export default AdminPage;
