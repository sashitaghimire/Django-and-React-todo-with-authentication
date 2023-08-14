import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";

export default function SignUpForm({ id, userDetail }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (userDetail) {
      setValue("name", userDetail?.name);
      setValue("email", userDetail?.email);
    }
  }, [userDetail]);
  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({
          field: { value, onChange },
          fieldState: { invalid, error },
        }) => (
          <>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Username"
              name="name"
              autoComplete="name"
              autoFocus
              error={invalid}
              helperText={error?.message}
              {...{ onChange, value }}
            />
          </>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({
          field: { value, onChange },
          fieldState: { invalid, error },
        }) => (
          <>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              error={invalid}
              helperText={error?.message}
              {...{ onChange, value }}
            />
          </>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({
          field: { value, onChange },
          fieldState: { invalid, error },
        }) => (
          <>
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              autoComplete="password"
              type="password"
              autoFocus
              error={invalid}
              disabled={id}
              helperText={error?.message}
              {...{ onChange, value }}
            />
          </>
        )}
      />

      <Controller
        name="password2"
        control={control}
        render={({
          field: { value, onChange },
          fieldState: { invalid, error },
        }) => (
          <>
            <TextField
              margin="normal"
              fullWidth
              label="Confirm Password"
              name="password"
              autoComplete="password"
              type="password"
              autoFocus
              error={invalid}
              disabled={id}
              helperText={error?.message}
              {...{ onChange, value }}
            />
          </>
        )}
      />

      {!id && (
        <Controller
          name="tc"
          control={control}
          render={({
            field: { value, onChange },
            fieldState: { invalid, error },
          }) => (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="tc"
                    margin="normal"
                    {...{ onChange, value }}
                  />
                }
                label="I have read and agreed to Terms and Conditons"
              />
            </>
          )}
        />
      )}
    </>
  );
}
