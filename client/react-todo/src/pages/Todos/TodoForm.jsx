import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";

export default function TodoForm({ todoDetail }) {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (todoDetail) {
      setValue("title", todoDetail?.title);
      setValue("completed", todoDetail?.completed);
    }
  }, [todoDetail]);
  return (
    <>
      <Controller
        name="title"
        control={control}
        render={({
          field: { value, onChange },
          fieldState: { invalid, error },
        }) => (
          <>
            <TextField
              margin="normal"
              fullWidth
              id="title"
              label="Todo Title"
              name="title"
              autoFocus
              error={invalid}
              helperText={error?.message}
              {...{ onChange, value }}
            />
          </>
        )}
      />

      <Controller
        name="completed"
        control={control}
        render={({ field: { value, onChange } }) => (
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
              label="Completed"
            />
          </>
        )}
      />
    </>
  );
}
