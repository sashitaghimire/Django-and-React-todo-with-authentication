import * as React from "react";
import { useMutation, useQuery } from "react-query";
import { AdminPanelSettings, Person } from "@mui/icons-material";
import UserModal from "./UserModal";
import { Chip } from "@mui/material";
import { axiosInstance } from "../../services/api";
import CustomTable from "../../components/common/CustomTable";
import { toast } from "react-toastify";

const columns = [
  { id: "sn", label: "SN", minWidth: 120 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "is_active",
    label: "Status",
    minWidth: 170,
    align: "center",
  },
  {
    id: "super_admin",
    label: "Admin",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 120,
  },
];

export default function UserTable({ open, setOpen }) {
  const [id, setId] = React.useState();
  // Get the user data from the AuthContext

  const fetchListData = async () => {
    try {
      const response = await axiosInstance.get("/user/user-list/");
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
        `/user/user-detail/${id}/`,
        {}
      );
      return response.data;
    } catch (error) {
      throw new Error("Error deleting data from the API");
    }
  };

  // Create a mutation function for the delete operation
  const deleteMutation = useMutation(deleteData, {
    // When the mutation is successful, invalidate the 'listData' query to trigger a refetch
    onSuccess: () => {
      toast.success("User Deleted Successfully");
      refetch();
    },
  });

  // Function to handle the delete button click
  const handleDelete = (id) => {
    // Call the deleteMutation.mutate() function to delete the item with the given ID
    deleteMutation.mutate(id);
  };

  const keyMap = {
    Name: (rowData) => `${rowData?.name}`,
    Email: (rowData) => `${rowData?.email}`,
    Status: (rowData) => (
      <>
        {" "}
        {rowData?.is_active ? (
          <Chip label="Active" variant="contained" color="success" />
        ) : (
          <Chip label="Inactive" />
        )}
      </>
    ),
    Admin: (rowData) => (
      <>
        {rowData?.is_admin ? (
          <AdminPanelSettings color="primary" />
        ) : (
          <Person color="default" />
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
        isFromUser
      />

      <UserModal
        open={open}
        setOpen={setOpen}
        setId={setId}
        id={id}
        refetch={refetch}
      />
    </>
  );
}
