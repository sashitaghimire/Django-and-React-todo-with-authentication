import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import SignUpForm from "../Auth/Register/SignupForm";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import BootstrapDialogTitle from "../../components/common/BootstrapDialogTitle";
import { axiosInstance } from "../../services/api";

export default function UserModal({ open, setOpen, id, refetch, setId }) {
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

      if (!id) {
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
      }

      return { values: data, errors };
    },
  });

  const { reset } = methods;

  const fetchUserListDetail = async (id) => {
    try {
      const response = await axiosInstance.get(`/user/user-detail/${id}`);
      return response.data; // Assuming the API returns an array of data
    } catch (error) {
      throw new Error("Error fetching list data from the API");
    }
  };
  const useUserDetailData = (id) => {
    return useQuery(["user-detail", id], () => fetchUserListDetail(id), {
      enabled: !!id,
    });
  };

  const { data: userDetail, isLoading, isError, error } = useUserDetailData(id);

  const registerUser = async (formData) => {
    const response = await axiosInstance.post(
      "/user/register/",
      JSON.stringify(formData),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  };

  const updateUser = async (formData) => {
    const response = await axiosInstance.put(
      `/user/user-detail/${id}/`,
      JSON.stringify(formData),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  };

  const updateUserDetail = useMutation(updateUser, {
    onSuccess: (response) => {
      toast.success("User Updated Successfully");
      handleClose();
      reset({});
      refetch();
      setId("");
    },
    onError: (error) => {
      toast.error("Error");
      handleClose();
      setId("");
    },
  });

  const addUser = useMutation(registerUser, {
    onSuccess: (response) => {
      toast.success("User Registration Successfull");
      handleClose();
      reset({});
      refetch();
    },
    onError: (error) => {
      if (error?.response?.data?.errors?.non_field_errors) {
        toast.error(error?.response?.data?.errors?.non_field_errors[0]);
      }
      if (error?.response?.data?.errors?.email) {
        toast.error(error?.response?.data?.errors?.email[0]);
      } else {
        toast.error("Server error");
      }

      handleClose();
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
    if (id) {
      updateUserDetail.mutate(formData);
    } else {
      addUser.mutate(formData);
    }
  };

  const handleClose = () => {
    reset({});
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {id ? "Update User" : "Add User"}
        </BootstrapDialogTitle>

        <FormProvider {...{ ...methods }}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <DialogContent dividers>
              <SignUpForm id={id} userDetail={userDetail} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button autoFocus type="submit" variant="outlined">
                Submit
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </div>
  );
}
