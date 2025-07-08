import { Navigate } from "react-router";
import Loading from "../components/shared/Loading/Loading";
import useStatus from "../hooks/useStatus";
import useRole from "../hooks/useRole";

const PremiumRoutes = ({ children }) => {
  const [userStatus, isStatusLoading] = useStatus();
  const [role, isRoleLoading] = useRole();

  console.log("I was here, in SellerRoute");
  if (isStatusLoading || isRoleLoading) return <Loading />;
  if (userStatus === "premium" || role === "admin") return children;
  return <Navigate to="/" replace="true" />;
};

export default PremiumRoutes;
