import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import GridBase from "../GridBase/GridBase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import request from "../Requests/Requests";
import apis from "../Requests/apis";
import Swal from "sweetalert2";
const defaultFilter = { page: 0, pageSize: 10 };

const Employee = () => {
  const [filters, setFilters] = useState(defaultFilter);
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(null);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      setIsShowLoader(true);
      const response = await request({
        url: apis.getEmployees,
        payload: { pageNo: filters.page + 1, pageSize: filters.pageSize },
      });

      if (response && response.status === 200) {
        const responseData = await response.json();
        const { data, totalRowCount } = responseData;
        setData(data);
        setRowCount(totalRowCount);
        setIsShowLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [filters.page, filters.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = () => {
    console.log("edit");
  };

  const handleCopy = () => {
    console.log("copy");
  };

  const handleDelete = (rowId) => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete this row?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            setIsShowLoader(true);
            const response = await request({
              url: apis.deleteEmployees,
              payload: { employeeIDs:[rowId] },
            });
      
            if (response && response.status === 200) {
              setIsShowLoader(false);
            }
          Swal.fire({
            title: "Success",
            text: "Row has been deleted",
            icon: "success",
          });
          fetchData();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // const handleRowSelection = (selected) => {
  //   setSelectedRows(selected.map((row) => row.id));
  // };

  const handleMultipleDelete = () => {
    if (selectedRows.length === 0) {
      return;
    }

    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete the selected rows?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsShowLoader(true);
            const response = await request({
              url: apis.deleteEmployees,
              payload: {employeeIDs:selectedRows},
            });
      
            if (response && response.status === 200) {
              setIsShowLoader(false);
            }
          Swal.fire({
            title: "Success",
            text: "Selected rows have been deleted",
            icon: "success",
          });
          setSelectedRows([]);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const columns = [
    { field: "id", headerName: "EmployeeID", width: 70 },
    { field: "FirstName", headerName: "First name", width: 130 },
    { field: "LastName", headerName: "Last name", width: 130 },
    {
      field: "Country",
      headerName: "Country",
      width: 90,
    },
    {
      field: "PhoneNumber",
      headerName: "PhoneNumber",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-between">
          <button onClick={handleEdit} className="text-sky-600">
            <EditIcon />
          </button>
          <button
            onClick={() => handleDelete(params.row.id)}
            className="text-red-600"
          >
            <DeleteIcon />
          </button>

          <button onClick={handleCopy} className="text-black-600">
            <FileCopyIcon />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 mt-20">
<div className="flex justify-between items-center">
  {selectedRows.length !== 0 && (
    <Button onClick={handleMultipleDelete} variant="contained" startIcon={<DeleteIcon />}>
      Delete {selectedRows.length}
    </Button>
  )}

  <div>
    <Button variant="outlined" endIcon={<AddIcon />}>
      Create
    </Button>
  </div>
</div>


      <GridBase
        rows={data}
        columns={columns}
        loading={isShowLoader}
        pageSizeOptions={[10, 20, 50, 100]}
        pagination
        page={filters.page}
        pageSize={filters.pageSize}
        paginationModel={filters}
        paginationMode="server"
        onPaginationModelChange={setFilters}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedRows(newRowSelectionModel);
        }}
        rowSelectionModel={selectedRows}
        disableRowSelectionOnClick
        autoHeight={true}
        showTitleColumn={true}
        rowCount={rowCount}
      />
    </div>
  );
};

export default Employee;
