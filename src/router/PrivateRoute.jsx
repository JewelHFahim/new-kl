import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { isLoading } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  if (isLoading) {
    return (
      <div className="w-scrren h-screen flex justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (token) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRouter;
