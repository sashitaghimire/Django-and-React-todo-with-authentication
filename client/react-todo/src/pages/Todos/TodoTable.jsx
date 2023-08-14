import * as React from "react";
import { useMutation, useQuery } from "react-query";
import { CheckCircle } from "@mui/icons-material";
import { axiosInstance } from "../../services/api";
import { toast } from "react-toastify";
import TodoModal from "./TodoModal";
import CustomTable from "../../components/common/CustomTable";

const columns = [
  { id: "sn", label: "SN", minWidth: 120 },
  { id: "title", label: "Title", minWidth: 170 },
  { id: "completed", label: "Completed", minWidth: 100 },
  {
    id: "action",
    label: "Action",
    minWidth: 120,
  },
];

export default function TodoTable({ open, setOpen }) {
  const [id, setId] = React.useState();
  // Get the user data from the AuthContext

  const fetchListData = async () => {
    try {
      const response = await axiosInstance.get("/todos/task-list/");
      return response.data; // Assuming the API returns an array of data
    } catch (error) {
      throw new Error("Error fetching list data from the API");
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "listData",
    fetchListData
  );

  const deleteData = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/todos/task-delete/${id}/`,
        {}
      );
      return response.data;
    } catch (error) {
      throw new Error("Error deleting data from the API");
    }
  };

  // Create a mutation function for the delete operation
  const deleteMutation = useMutation(deleteData, {
    onSuccess: () => {
      toast.success("Todo Deleted Successfully");
      refetch();
    },
  });

  // Function to handle the delete button click
  const handleDelete = (id) => {
    // Call the deleteMutation.mutate() function to delete the item with the given ID
    deleteMutation.mutate(id);
  };

  const keyMap = {
    Title: (rowData) => `${rowData?.title}`,
    Completed: (rowData) => (
      <>
        {rowData?.completed ? (
          <CheckCircle style={{ color: "green" }} />
        ) : (
          <CheckCircle style={{ color: "gray" }} />
        )}
      </>
    ),
  };

  return (
    <>
      <CustomTable
        loading={isLoading}
        columns={columns}
        rows={data}
        keyMap={keyMap}
        handleDeleteRow={handleDelete}
        handleEditRow={() => {
          setOpen(true);
        }}
        setId={setId}
      />

      <TodoModal
        open={open}
        setOpen={setOpen}
        setId={setId}
        id={id}
        refetch={refetch}
      />
    </>
  );
}
