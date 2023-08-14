import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import { useMutation } from "react-query";
import React from "react";
import SignUpForm from "./SignupForm";
import { useHistory } from "react-router-dom";
import backImg from "../../../assets/Background.png";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "../../../services/axios";

export default function SignUp() {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
      tc: false,
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

      if (!data?.password2) {
        errors.password2 = {
          type: "required",
          message: "Confirm password is required",
        };
      }

      return { values: data, errors };
    },
  });

  const { reset } = methods;

  const history = useHistory();

  const registerUser = async (formData) => {
    const response = await axios.post(
      "/user/register/",
      JSON.stringify(formData),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  };

  const mutation = useMutation(registerUser, {
    onSuccess: (response) => {
      toast.success("User Registration Successfull");
      if (response?.status === 200) {
        history.push("/login");
      }
    },
    onError: (error) => {
      toast.error("Error");
    },
  });

  const handleSubmit = async (values) => {
    const formData = {
      name: values?.name,
      email: values?.email,
      password: values?.password,
      password2: values?.password2,
      tc: values?.tc,
    };
    mutation.mutate(formData);
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
      <Container component="main" maxWidth="sm">
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
            Create a new account
          </Typography>
          <FormProvider {...{ ...methods }}>
            <Box
              component="form"
              onSubmit={methods.handleSubmit(handleSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <SignUpForm />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Divider sx={{ margin: "10px 0px" }} />
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have account. Login
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
