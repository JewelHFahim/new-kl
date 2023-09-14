import { HiArrowNarrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { isLoading } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  console.log(token);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        

        <div className="flex flex-col items-center gap-10">
          <span className="loading loading-ring loading-lg"></span>
          <p className="text-red-300">User Name/ Psssword incorrect</p>
          <Link to="/login" className="flex items-center gap-1 text-semibold text-primary"><HiArrowNarrowLeft/> Back Login</Link>
        </div>

      </div>
    );
  }

  if (token?.length >= 50 && token !== null && token !== undefined) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRouter;
