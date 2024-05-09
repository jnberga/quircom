import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { FaPersonDotsFromLine } from 'react-icons/fa6';
import WithAuth from '../auth/WithAuth';

const LoFL = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    const [freelancers, setUserData] = useState([]);
    
  
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      axios
        .get(`https://quircom.onrender.com/api/freelancer`, {headers})
        .then((response) => {
          setUserData(response.data); // Set the user data in state
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }, []);

    return (
      <div className="flex flex-col bg-red-500 items-center h-full w-[90%]">
        <div className="flex w-[100%] items-center py-2 px-5 bg-[#F5F5DC] text-[#13334C] font-medium">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => handleChangeRowsPerPage(e)}
            className="mx-2 px-2 py-1 bg-blue-100 rounded text-[#13334C] border-[2px] border-[#13334C]"
          >
            {[5, 10, 20].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full bg-white shadow-md">
          <table className="min-w-full">
            <thead className="bg-[#1d5b79] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold">Freelancer Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Username</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Portfolio</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {freelancers.map((freelancer) => (
                <tr key={freelancer._id} className="border-b bg-blue-200 text-[#13334C]">
                  <td className="px-6 py-4 text-left">{freelancer.firstName} {freelancer.surName}</td>
                  <td className="px-6 py-4 text-left">{freelancer.userName}</td>
                  <td className="px-6 py-4 text-left">{freelancer.eMail}</td>
                  <td className="px-6 py-4 text-left">{freelancer.contactNum}</td>
                  <td className="px-6 py-4 text-left">{freelancer.portFolio?.name}</td> {/* Assuming portFolio is an object with a name property */}
                  <td className="px-6 py-4 text-left">
                    <button
                      type="button"
                      className="mr-2 px-2 py-1 bg-blue-500 rounded text-white"
                    >
                      <FaPersonDotsFromLine className="inline" />
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 bg-red-500 rounded text-white"
                    >
                      <FaTrash className="inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default WithAuth(LoFL);