import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Signup from "./pages/Auth/Register";
import NotFound from "./pages/ErrorPage/Notfound";
import Header from "./pages/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import User from "./pages/User";
import Login from "./pages/Auth/Login";
import Todos from "./pages/Todos";
import UserProfile from "./pages/User/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthDispatch, useAuthState } from "./context/AuthContext";
import { setAuthToken } from "./services/api";
import FullScreenLoader from "./components/common/FullScreenLoader";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authState = useAuthState();
  return (
    <Route
      {...rest}
      render={(props) =>
        authState?.token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const GuestRoute = ({ component: Component, ...rest }) => {
  const authState = useAuthState();
  return (
    <Route
      {...rest}
      render={(props) =>
        authState?.token ? <Redirect to="/todo" /> : <Component {...props} />
      }
    />
  );
};
const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const authState = useAuthState();

  const authDispatch = useAuthDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      authDispatch({
        type: "LOGIN_SUCCESS",
        payload: { token: accessToken },
      });
      setAuthToken(accessToken);
    }
    setIsLoading(false);
  }, [authDispatch]);

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider> */}
      <ToastContainer />

      <Router>
        {authState?.token ? <Header /> : ""}

        <Switch>
          <GuestRoute exact path="/login" component={Login} />
          <GuestRoute exact path="/signup" component={Signup} />

          <>
            {" "}
            <PrivateRoute
              exact
              path="/"
              component={() => <Redirect to="/todo" />}
            />
            <PrivateRoute exact path="/todo" component={Todos} />
            <PrivateRoute exact path="/user" component={User} />
            <PrivateRoute exact path="/profile" component={UserProfile} />
          </>

          <PrivateRoute component={NotFound} />
        </Switch>
      </Router>

      {/* </AuthProvider> */}
    </QueryClientProvider>
  );
};

export default App;
