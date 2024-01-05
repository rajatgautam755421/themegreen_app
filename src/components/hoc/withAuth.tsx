import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../helpers/general";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuth: React.FC<P> = (props) => {
    if (isAuthenticated()) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to={"/login"} />;
    }
  };

  return WithAuth;
};

export default withAuth;
