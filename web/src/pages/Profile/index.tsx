import { lazy, Suspense, useMemo } from "react";
import { Workspace } from "../../components/Workspace";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { Loading } from "../../components/Loading";

const OverviewPage = lazy(async () => import("./Overview"));
const EditPage = lazy(async () => import("./Edit"));

const Overview: React.FC = () => {
  const { url } = useRouteMatch();

  const workspaceItems = useMemo(() => {
    const items = [
      {
        label: "Overview",
        to: `${url}/overview`,
      },
      {
        label: "Edit",
        to: `${url}/edit`,
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
          <Route path={`${url}/overview`} render={() => <OverviewPage />} />
          <Route path={`${url}/edit`} render={() => <EditPage />} />
          <Route render={() => <Redirect to={`${url}/overview`} />} />
        </Switch>
      </Suspense>
    </Workspace>
  );
};

const ProfilePage = () => <Overview />;

export default ProfilePage;
