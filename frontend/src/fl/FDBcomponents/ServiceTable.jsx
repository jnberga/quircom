import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableCell,
} from "@mui/material/";
import AddModal from "./addServiceModal";
import Deletion from "./deleteModal";
import UpdateModal from "./updateModal";

import { MdDesignServices } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { AiFillPlusCircle } from "react-icons/ai";



const serviceColumns = [
  { id: "serviceID", label: "Service ID", minWidth: 100, align: "center" },
  { id: "serviceTitle", label: "Service Title", minWidth: 170 },
  {
    id: "serviceDetails",
    label: "Details",
    minWidth: 200,
    align: "left",
  },
  {
    id: "servicePrice",
    label: "Service Price",
    minWidth: 100,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
    format: (setDeleteModal,setUpdateModal) => (
      <div>
        <button
          type="button"
          onClick={() => setUpdateModal(true)}
          className="mr-2 px-2 py-1 bg-blue-500 rounded text-white"
        >
          <MdDesignServices className="inline" />
        </button>
        
        <button
          type="button"
          onClick={() => setDeleteModal(true)}
          className="px-2 py-1 bg-red-500 rounded text-white"
        >
          <FaTrashCan className="inline" />
        </button>
      </div>
    ),
  },
];

function serviceData(serviceID, serviceTitle, serviceDetails, servicePrice) {
  const formattedPrice = `₱ ${Number(servicePrice).toLocaleString()}`;
  return { serviceID, serviceTitle, serviceDetails, servicePrice: formattedPrice };
}

const ServiceTable = () => {
  const [addModal, setaddModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { userId } = useParams();
  const [ serviceInfo, setService] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/service/`);
        if (response.status === 200) {
          // Log the raw response data
          console.log("Raw API Response:", response.data);
          
          // Filter services based on freelancerId
          const filteredServices = response.data.filter(service => service.freelancerId._id === userId);
          
          // Log the filtered services
          console.log("Filtered Services:", filteredServices);
          
          // Update the state with filtered services
          setService(filteredServices);
        } else {
          console.error("Error fetching services: Unexpected status code", response.status);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
  
    fetchServices();
  }, [userId]); // Include userId in the dependency array
  
  
  const serviceRows = serviceInfo.map(service => {
    return serviceData(service.serviceId, service.serviceName, service.serviceInfo, service.price);
  });

  console.log(serviceInfo)

  return (
    <div className="flex flex-col justify-center items-center w-[100%]">
      <Paper sx={{ width: "100%" }}>
        <div className="flex justify-between items-center p-2 bg-[#13334C] ">
        <button
            type="button"
            onClick={() => setaddModal(true)}
            className="bg-blue-500 py-2 px-3 mx-4 rounded text-white"
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <AiFillPlusCircle size={20} color="white" />
              <h1>Add Service</h1>
            </div>
          </button>
          {addModal ? <AddModal setaddModal={setaddModal} /> : null}
          <TablePagination
            sx={{
              backgroundColor: "#13334C",
              color: "white",
              ".MuiSelect-root": { color: "white" },
              ".MuiSelect-icon": { color: "white" },
              ".MuiSelect-iconFilled": { color: "white" },
              ".MuiSelect-iconOutlined": { color: "white" },
            }}
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={serviceRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          
        </div>
        <TableContainer
          sx={{
            height: 485,
            width: "100%",
            backgroundColor: "white",
            boxShadow: "0 12px 24px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {serviceColumns.map((serviceColumns) => (
                  <TableCell
                    key={serviceColumns.id}
                    align={serviceColumns.align}
                    style={{
                      minWidth: serviceColumns.minWidth,
                      backgroundColor: "#1d5b79",
                      color: "white",
                    }}
                  >
                    {serviceColumns.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={rowIndex}
                    >
                      {serviceColumns.map((serviceColumns) => {
                        const value = row[serviceColumns.id];
                        return (
                          <TableCell
                            key={serviceColumns.id}
                            align={serviceColumns.align}
                          >
                            {serviceColumns.id === "actions"
                              ? serviceColumns.format(setDeleteModal,setUpdateModal)
                              : serviceColumns.format &&
                                typeof value === "number"
                              ? serviceColumns.format(setDeleteModal,setUpdateModal)
                              : value}
                            {deleteModal ? <Deletion setDeleteModal={setDeleteModal} /> : null}
                            {updateModal ? <UpdateModal setUpdateModal={setUpdateModal} /> : null}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* <Modal/>    */}
    </div>
  );
};

export default ServiceTable;
