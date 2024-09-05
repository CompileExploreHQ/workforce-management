import { useMemo } from "react";
import { useRouteMatch } from "react-router-dom";
import { Workspace } from "../../components/Workspace";

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
      <>Global Admin</>
    </Workspace>
  );
};

const AdminPage = () => <Admin />;

export default AdminPage;
