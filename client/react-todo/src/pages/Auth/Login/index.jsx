import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Divider } from "@mui/material";
import React from "react";
import { useMutation } from "react-query";
import LoginForm from "./LoginForm";
import backImg from "../../../assets/Background.png";
import { FormProvider, useForm } from "react-hook-form";
import { useAuthDispatch } from "../../../context/AuthContext";
// import { axiosInstance, setAuthToken } from "../../../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import { axiosInstance, setAuthToken } from "../../../services/api";

export default function Login() {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: (data) => {
      const errors = {};
      if (!data?.email) {
        errors.email = {
          type: "required",
          message: "Email is required",
        };
      }

      if (!data?.password) {
        errors.password = {
          type: "required",
          message: "Password is required",
        };
      }

      if (data?.password?.length > 8) {
        errors.password = {
          type: "max_length",
          message: "Must be greater than 8 characters",
        };
      }
      return { values: data, errors };
    },
  });

  const { reset } = methods;
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const loginUser = async (formData) => {
    const response = await axiosInstance.post(
      "/user/login/",
      JSON.stringify(formData),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  };

  const authDispatch = useAuthDispatch();

  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      toast.success("Login Successfull");
      const { user } = data;

      authDispatch({
        type: "LOGIN_SUCCESS",
        payload: { token: data?.data?.token?.access },
      });
      setAuthToken(data?.data?.token?.access);
      history.push("/");
    },
    onError: (error) => {
      // toast.error("Error");
    },
  });

  const handleLogin = (values) => {
    // e.preventDefault();
    const formData = {
      // Replace this with your form data. For example:
      email: values?.email,
      password: values?.password,
    };
    loginMutation.mutate(formData);
  };

  return (
    <Box
      style={{
        alignItems: "center",
        backgroundSize: "cover",
        display: " flex",
        minHeight: "100vh",
        padding: "50px 0",
        position: "relative",
        backgroundImage: `url(${backImg})`,
      }}
    >
      <Container component="main" maxWidth="sm"yout>
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
          }}
        >
          {" "}
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <FormProvider {...{ ...methods }}>
            <Box
              component="form"
              onSubmit={methods.handleSubmit(handleLogin)}
              noValidate
              sx={{ mt: 1 }}
            >
              <LoginForm />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Divider sx={{ margin: "10px 0px" }} />
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Create a new account.Signup
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </FormProvider>
        </Box>
      </Container>
    </Box>
  );
}
