import { useEffect, useState, useContext } from "react";
import React from "react";
import axios from "axios"; // Import axios for making HTTP requests
import UserContext from "../context/UserContext";
import { useParams } from "react-router-dom";
import WithAuth from "../auth/WithAuth";

import BG1 from "../assets/bg1.png";
import { MdDesignServices, MdPendingActions, MdTimeline } from "react-icons/md";
import { FaFileCircleCheck } from "react-icons/fa6";
import FMainNav from "./FMainNav";
import FFooter from "./FFooter";

import FTable from "./FDBcomponents/TrackerTable";
import ServiceTable from "./FDBcomponents/ServiceTable";
import PendingTable from "./FDBcomponents/PendingTable";

function FDashboard() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(); // State to store user data
  const [activeTab, setActiveTab] = useState("track");
  const [serviceDetails, setService] = useState([]);
  const [pendingDetails, setPending] = useState([]);
  const [requestDetails, setRequest] = useState([]);
  const [finishDetails, setFinish] = useState([]);

  const handleTab = (track) => {
    setActiveTab(track);
  };

  const { userIdLink } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`https://quircom.onrender.com/api/freelancer/${userId}`, {headers})
      .then((response) => {
        setUserData(response.data); // Set the user data in state
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/service/`,
          { headers }
        );
        const response2 = await axios.get(
          `https://quircom.onrender.com/api/request/`,
          { headers }
        );
        if (response.status === 200) {
          // Ensure response.data is not null or undefined
          if (response.data) {
            // Filter services only if response.data is not null or undefined
            const filteredServices = response.data.filter(
              (service) => service.freelancerId && service.freelancerId._id === userId
            );
            setService(filteredServices);
          } else {
            console.error("Error fetching services: response data is null or undefined");
          }
        }
        if (response2.status === 200) {
          // Ensure response.data is not null or undefined
          if (response2.data) {
            // Filter services only if response.data is not null or undefined
            const filteredPending = response2.data.filter(
              (request) => request.serviceId.freelancerId._id === userId &&
              request.status === "Pending"
            );
            const filteredRequest = response2.data.filter(
              (request) => request.serviceId.freelancerId._id === userId &&
              request.status === "Ongoing"
            );
            const filteredFinished = response2.data.filter(
              (request) => request.serviceId.freelancerId._id === userId &&
              request.status === "Complete"
            );
            setRequest(filteredRequest);
            setFinish(filteredFinished);
            setPending(filteredPending);
          } else {
            console.error("Error fetching services: response data is null or undefined");
          }
        }
        else {
          console.error(
            "Error fetching services: Unexpected status code",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [userId]);

  return (
    <div
      className="h-full"
      style={{
        background: `url(${BG1})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <FMainNav />
      <div className="flex align-center justify-center mx-[100px]">
        <div className="flex flex-col container my-10">
          {/*formatting navbar & body -j*/}
          {/* Box Analytics */}
          <div className="grid grid-cols-4 gap-[20px] my-[15px]">
            <div className="flex flex-col justify-around px-4 py-4 border-[#1D5B79] border-[3px] border-solid bg-white hover:shadow-lg rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] text-[#13334C] font-bold">
                  My Services
                </h1>
                <MdDesignServices size={30} color="#1d5b79" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">
                {serviceDetails.length}
              </h1>
            </div>
            <div className="flex flex-col justify-around px-4 py-4 border-[#1D5B79] border-[3px] border-solid bg-white hover:shadow-lg rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] text-[#13334C] font-bold">
                  Pending Request
                </h1>
                <MdPendingActions size={30} color="#1d5b79" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">{pendingDetails.length}</h1>
            </div>
            <div className="flex flex-col justify-around px-4 py-4 border-[#1D5B79] border-[3px] border-solid bg-white hover:shadow-lg rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] text-[#13334C] font-bold">
                  On-Going Project
                </h1>
                <MdTimeline size={30} color="#1d5b79" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">
                {requestDetails.length}
              </h1>
            </div>
            <div className="flex flex-col justify-around px-4 py-4 border-[#1D5B79] border-[3px] border-solid bg-white hover:shadow-lg rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] text-[#13334C] font-bold">
                  Finished Projects
                </h1>
                <FaFileCircleCheck size={27} color="#1d5b79" />
              </div>
              <h1 className="font-medium text-[#1D5B79]">{finishDetails.length}</h1>
            </div>
          </div>
          {/* Box Analytics */}
          {/* Menu Tabs */}
          <div className="flex flex-col justify-center items-center">
            {/* outside tabs */}
            <div className="flex justify-between w-[90%] items-center my-[50px]">
              <button
                className={
                  activeTab === "track"
                    ? "active-tab border-[#1D5B79] text-white bg-[#13334C] w-[31%] py-6 px-4 border-[3px] rounded-md"
                    : "border-[#1D5B79] w-[31%] p-4 border-[3px] rounded-md hover:py-6 hover:bg-[#13334C] hover:text-white"
                }
                onClick={() => handleTab("track")}
              >
                <h1 className=" text-lg font-extrabold">Ticket Tracker</h1>
              </button>
              <button
                className={
                  activeTab === "pending"
                    ? "active-tab border-[#1D5B79] text-white bg-[#13334C] py-6 px-4 w-[31%] border-[3px] rounded-md"
                    : "border-[#1D5B79] w-[31%] p-4 border-[3px] rounded-md hover:py-6 hover:bg-[#13334C] hover:text-white"
                }
                onClick={() => handleTab("pending")}
              >
                <h1 className=" text-lg font-extrabold">Pending Requests</h1>
              </button>
              <button
                className={
                  activeTab === "manage"
                    ? "active-tab border-[#1D5B79] text-white bg-[#13334C] py-6 px-4 w-[31%] border-[3px] rounded-md"
                    : "border-[#1D5B79] w-[31%] p-4 border-[3px] rounded-md hover:py-6 hover:bg-[#13334C] hover:text-white"
                }
                onClick={() => handleTab("manage")}
              >
                <h1 className=" text-lg font-extrabold">Manage Services</h1>
              </button>
            </div>
            {/* inside tabs */}
            <div className="flex flex-col justify-center items-center w-[90%]">
              {activeTab === "track" && <FTable />}
              {activeTab === "pending" && <PendingTable />}
              {activeTab === "manage" && <ServiceTable />}
            </div>
          </div>
          {/* Menu Tabs */}
        </div>
      </div>
      <FFooter />
    </div>
  );
}

export default WithAuth(FDashboard);