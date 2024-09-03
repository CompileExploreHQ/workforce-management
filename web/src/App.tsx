import { lazy, Suspense } from "react";
import { FullPageLoading } from "./components/FullPageLoading";
import { useAuth } from "./context/AuthProvider";

const AppAuthenticated = lazy(async () => import("./AppAuthenticated"));
const AppUnauthenticated = lazy(async () => import("./AppUnauthenticated"));

export const App: React.FC = () => {
  const { authorized } = useAuth();

  return (
    <Suspense fallback={<FullPageLoading />}>
      {authorized ? <AppAuthenticated /> : <AppUnauthenticated />}
    </Suspense>
  );
};
