// AuthContext.js

import { createContext, useContext, useReducer, useEffect } from "react";
import { refreshAccessToken } from "../utils/authUtils"; // Import the utility function
// Import your axios instance

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const initialState = {
  token: null,
};

const authReducer = (state, action) => {
 
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("accessToken", action?.payload?.token);
      // localStorage.setItem("refreshToken", action?.payload?.token?.refresh);
      return {
        ...state,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token: accessToken },
      });
    }
    // else {
    //   dispatch({ type: "LOGOUT" });
    // }

    if (refreshToken) {
      refreshAccessToken(refreshToken).then((newAccessToken) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { token: newAccessToken },
        });
      });
      // .catch(() => {
      //   dispatch({ type: "LOGOUT" });
      // });
    }
  }, []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// ... (other code for useAuthState and useAuthDispatch)

const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
};

const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthDispatch };
