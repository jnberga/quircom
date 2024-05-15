import {
  Box,
  Stack,
  Typography,
  ButtonBase,
  Divider,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Popover,
  Chip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Logo from "../assets/Icon1.png";
import Logo2 from "../assets/clientNav.png";
import Dboard from "../assets/dboard.png";
import Settings from "../assets/settings.png";
import Service from "../assets/service.png";
import Notifs from "../assets/bell.png";
import Bill from "../assets/bill.png";
import LBoard from "../assets/crown.png";
import User from "../assets/user.png";

import WithAuth from "../auth/WithAuth";

const CMainNav = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`https://quircom.onrender.com/api/client/${userId}`, { headers })
      .then((response) => {
        console.log("User ID in Dashboard:", userId);
        console.log("User data:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const icons = [
    {
      icon: Dboard,
      component: `/client/dashboard/${userId}`,
      text: "Dashboard",
      index: 0,
    },
    {
      icon: Service,
      component: `/client/browse-service/${userId}`,
      text: "Marketplace",
      index: 1,
    },
    {
      icon: LBoard,
      component: `/client/leaderboard/${userId}`,
      text: "Leaderboard",
      index: 3,
    },
    {
      icon: Bill,
      component: `/client/subscribe/${userId}/`,
      text: "Subscription",
      index: 4,
    },
  ];

  const handleIconClick = (index) => {
    setSelectedIcon(index);
    console.log(icons[index].path);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    console.clear();
    localStorage.removeItem("authToken");
  };

  const getLogo = () => {
    if (window.innerWidth >= 600) {
      return <img src={Logo} alt="Logo" />;
    } else {
      return <img src={Logo2} alt="Logo 2" />;
    }
  };

  return (
    <Box
      px={2}
      sx={{
        width: "full",
        backgroundColor: "#F5F5DC",
        height: "8vh",
        borderBottom: "1px solid #ccc", // Add bottom border
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)", // Add bottom shadow
      }
    }
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{ height: "100%", width: "100%"}}
        justifyContent={"space-between"}
      >
        <Stack
          spacing={2}
          sx={{ width: "100%", height: "100%" }}
          direction="row"
          alignItems="center"
        >
          <Box sx={{ height: "full", width: 180 }}>
            <div className="hidden h-16 sm:flex">{getLogo()}</div>
            <div className="flex h-16 sm:hidden">{getLogo()}</div>
          </Box>
          <Divider orientation="vertical" sx={{ height: 40,"@media (max-width: 958px)": {
            display: "none", // Hide the icon buttons on medium screens
          }}} />
          <Stack direction={"row"} spacing={2} sx={{
          "@media (max-width: 958px)": {
            display: "none", // Hide the icon buttons on medium screens
          }}}>
            {icons.map((icon, index) => (
              <ButtonBase
                key={index}
                component={Link} // Use Link component instead of button
                to={icon.component}
                onClick={() => handleIconClick(index)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor:
                    selectedIcon === index ? "#fff" : "transparent",
                  borderRadius: 1,
                  boxShadow:
                    selectedIcon === index
                      ? "0px 2px 4px rgba(0, 0, 0, 0.25)"
                      : "none", // add shadow if selected
                  p: 1,
                  gap: 1, // add spacing between icon and typography
                }}
              >
                <img
                  className="w-6 h-6"
                  src={icon.icon}
                  alt={`Icon ${index}`}
                />
                <Typography variant="body1">{icon.text}</Typography>
              </ButtonBase>
            ))}
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
        >
          {userData && (
            <div className="md:flex items-center justify-center hidden ">
            <p className="text-[#1d5b79] font-bold px-2 my-2 text-nowrap">{userData.firstName}</p>
            <IconButton onClick={handleAvatarClick}>
              {userData.profilePic && userData.profilePic.link !== "" ? (
                <Avatar sx={{ boxShadow: 3 }} src={userData.profilePic.link} alt="User" />
              ) : (
                <Avatar sx={{ boxShadow: 3 }} src={User} alt="User" />
              )}
            </IconButton>
            <Divider orientation="vertical" sx={{ height: 40 }} />
          <div>
            <IconButton onClick={handleNotifClick}>
              <img
                className="w-10 h-6 mx-4 xl:mx-1 hover:scale-150 duration-300"
                src={Notifs}
                alt="Notifs"
              />
            </IconButton>
            <Popover
              open={Boolean(anchorEl2)}
              anchorEl={anchorEl2}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Typography sx={{ p: 2 }}>Notification 1</Typography>
              <Typography sx={{ p: 2 }}>Notification 2</Typography>
              <Typography sx={{ p: 2 }}>Notification 3</Typography>
            </Popover>
          </div>
            </div>
            
          )}
          
          
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem
              onClick={handleCloseMenu}
              component={Link}
              to={`/client/profile/${userId}`}
            >
              <Stack direction={"row"} spacing={1}>
                <img className="w-6 h-6 " src={User} alt="Profile" />
                <Typography variant="body1">Profile</Typography>
              </Stack>
            </MenuItem>
            <MenuItem
              onClick={handleCloseMenu}
              component={Link}
              to={`/client/settings/${userId}`}
            >
              <Stack direction={"row"} spacing={1}>
                <img className="w-6 h-6" src={Settings} alt="Settings" />
                <Typography variant="body1">Settings</Typography>
              </Stack>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                handleLogout();
              }}
              onAuxClick={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Chip
                  label="Logout"
                  sx={{ width: "13vh" }}
                  variant={isHovered ? "filled" : "outlined"}
                  color="error"
                  onMouseOver={() => setIsHovered(true)}
                  onMouseOut={() => setIsHovered(false)}
                  component={Link}
                  to="/"
                />
              </Stack>
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default WithAuth(CMainNav);
