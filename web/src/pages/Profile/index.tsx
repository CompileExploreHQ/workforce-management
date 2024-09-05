import { useMemo } from "react";
import { Workspace } from "../../components/Workspace";
import { useRouteMatch } from "react-router-dom";

const Profile: React.FC = () => {
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
      <>Profile</>
    </Workspace>
  );
};

const ProfilePage = () => <Profile />;

export default ProfilePage;
