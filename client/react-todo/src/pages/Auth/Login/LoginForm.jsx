import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Controller, useFormContext } from "react-hook-form";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function LoginForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      {/* {% csrf_token %} */}

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
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              required
              fullWidth
              label="Password"
              name="password"
              autoComplete="password"
              type={showPassword ? "text" : "password"}
              autoFocus
              error={invalid}
              helperText={error?.message}
              {...{ onChange, value }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
      />

      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
    </>
  );
}
