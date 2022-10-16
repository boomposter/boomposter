import { useAuth } from "../hooks/AuthProvider";

const AppLoading = ({ children }) => {
  const auth = useAuth();

  if (auth.user === undefined) {
    return (
      <div className="container pt-5 text-center">
        <h1>App loading...</h1>
      </div>
    );
  }

  return children;
};

export default AppLoading;
