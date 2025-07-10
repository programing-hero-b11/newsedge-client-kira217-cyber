// hooks/usePremiumExpiryCheck.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { toast } from "react-toastify";

const usePremiumExpiryCheck = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const checkPremium = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(`/user/${user.email}`);
          const dbUser = res.data;

          if (dbUser?.premiumTaken && dbUser?.subscriptionPeriod) {
            const expiry = new Date(dbUser.premiumTaken).getTime() + dbUser.subscriptionPeriod;
            const now = new Date().getTime();

            if (now > expiry) {
              // Subscription expired
              toast.info("Your premium subscription has expired.");
              navigate("/subscription");
            }
          }
        } catch (error) {
          console.error("Premium check failed:", error);
        }
      }
    };

    const interval = setInterval(checkPremium, 60000); // check every minute
    return () => clearInterval(interval);
  }, [user, axiosSecure, navigate]);
};

export default usePremiumExpiryCheck;
