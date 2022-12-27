import { useNavigate, useLocation } from "react-router-dom";
import qs from "qs";
import axios from "axios";

export const useAuthMutation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticket = qs.parse(location.search).ticket;

  return () => {
    axios
      .post(
        `${process.env.REACT_APP_AUTH_API}/oauth/login/ticket/${ticket}`,
        {}
      )
      .then(function (response) {
        const token = response?.data?.access_token;
        const refreshToken = response?.data?.refresh_token;
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refreshToken);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 500);
      })
      .catch(function (error) {
        return error;
      });
  };
};
