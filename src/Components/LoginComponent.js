import "../App.css";
import { useAuth, ContextHolder } from "@frontegg/react";
import { AdminPortal } from "@frontegg/react";
import TenantDropDown from "./TenantDropDown";
import axios from "axios";
import { useEffect, useCallback } from "react";

const Login = () => {
  const { user, isAuthenticated } = useAuth();
  const token = `${process.env.REACT_APP_TOKEN}`;

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };
  const handleClick = () => {
    AdminPortal.show();
  };

  const updateMetadata = useCallback(
    async (userId, userEmail) => {
      if (userEmail === `${process.env.REACT_APP_USER_EMAIL}`) {
        const metadata = {
          "Studied at": "Savitribai Phule Pune University",
          "Current Position": "Global Support Manager at Frontegg",
          "Last Company worked at": "Redis",
        };

        const apiUrl = `${process.env.REACT_APP_UPDATE_USER}/${userId}`;

        const option = {
          method: "PUT",
          url: apiUrl,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: metadata,
        };

        try {
          const response = await axios.request(option);
          console.log(`Metadata updated for ${user.name}`, response.data);
        } catch (error) {
          console.error("Error updating metadata", error);
        }
      } else {
        console.log(
          "User email does not match the requested one, couldn't update metadata"
        );
      }
    },
    [token, user?.name]
  );

  useEffect(() => {
    if (isAuthenticated && user?.id && user?.email) {
      updateMetadata(user.id, user.email);
    }
  }, [isAuthenticated, user, updateMetadata]);
  return (
    <div className="App">
      {isAuthenticated && (
        <div>
          <div>
            <img src={user?.profilePictureUrl || undefined} alt={user?.name} />
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <button onClick={handleClick}>Settings</button>
          <div>
            <button onClick={() => logout()}>Logout</button>
          </div>
          <TenantDropDown user={user} />
        </div>
      )}
    </div>
  );
};

export default Login;
