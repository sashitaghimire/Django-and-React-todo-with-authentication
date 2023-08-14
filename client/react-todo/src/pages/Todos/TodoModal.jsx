import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import TodoForm from "./TodoForm";
import BootstrapDialogTitle from "../../components/common/BootstrapDialogTitle";
import { axiosInstance } from "../../services/api";

export default function TodoModal({ open, setOpen, id, refetch, setId }) {
  const methods = useForm({
    defaultValues: {
      title: "",
      completed: false,
    },
    resolver: (data) => {
      const errors = {};
      if (!data?.title) {
        errors.title = {
          type: "required",
          message: "Title is required",
        };
      }

      return { values: data, errors };
    },
  });

  const { reset } = methods;

  const fetchTodoListDetail = async (id) => {
    try {
      const response = await axiosInstance.get(`/todos/task-detail/${id}`);
      return response.data; // Assuming the API returns an array of data
    } catch (error) {
      throw new Error("Error fetching list data from the API");
    }
  };
  const useTodoDetailData = (id) => {
    return useQuery(["user-detail", id], () => fetchTodoListDetail(id), {
      enabled: !!id,
    });
  };

  const { data: todoDetail, isLoading, isError, error } = useTodoDetailData(id);

  const registerUser = async (formData) => {
    const response = await axiosInstance.post("/todos/task-create/", formData);
    return response;
  };

  const updateTodo = async (formData) => {
    const response = await axiosInstance.post(
      `/todos/task-update/${id}/`,
      formData
    );
    return response;
  };

  const updateTodoDetail = useMutation(updateTodo, {
    onSuccess: (response) => {
      toast.success("Todo Updated Successfully");
      if (response?.status === 200) {
        handleClose();
        reset({});
        refetch();
        setId("");
      }
    },
    onError: (error) => {
      toast.error("Error");
      handleClose();
      setId("");
    },
  });

  const addTodo = useMutation(registerUser, {
    onSuccess: (response) => {
      toast.success("Todo Added Successfully");
      if (response?.status === 200) {
        handleClose();
        reset({});
        refetch();
      }
    },
    onError: (error) => {
      toast.error("Error");
      handleClose();
    },
  });

  const handleSubmit = async (values) => {
    const formData = {
      title: values?.title,
      completed: values?.completed,
    };
    if (id) {
      updateTodoDetail.mutate(formData);
    } else {
      addTodo.mutate(formData);
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
          {id ? "Update Todo" : "Add Todo"}
        </BootstrapDialogTitle>

        <FormProvider {...{ ...methods }}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <DialogContent dividers>
              <TodoForm id={id} todoDetail={todoDetail} />
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
