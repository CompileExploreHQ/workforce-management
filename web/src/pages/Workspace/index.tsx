import { useRouteMatch } from "react-router-dom";
import { Workspace } from "../../components/Workspace";
import { useMemo } from "react";

const Workspaces: React.FC = () => {
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
      {
        label: "Employee",
        to: `${url}/emloyee`,
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
      <>Workspace</>
    </Workspace>
  );
};

const WorkspacePage = () => <Workspaces />;

export default WorkspacePage;
