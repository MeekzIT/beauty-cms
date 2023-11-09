import React, { useEffect, useState } from "react";
import "./navbar.css";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { getMe, logoutAction } from "../../../store/actions/auth-action";
import { DELETED_PAGE, LOGIN_PAGE } from "../../../routing/pats";
import { getAccessWorks } from "../../../store/actions/user-action";
import { Button } from "@mui/material";

const Navbar = ({ close, setClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const role = useSelector((state) => state.auth.isSuper);
  const data = useSelector((state) => state.users.accessWorks);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    dispatch(getMe());
  }, []);
  useEffect(() => {
    role == "superAdmin" && dispatch(getAccessWorks());
  }, [role]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    dispatch(logoutAction());
    navigate(LOGIN_PAGE);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          {isAuth && (
            <div className="item">
              <PersonIcon
                sx={{
                  color: "white",
                }}
                fontSize="large"
                onClick={handleClick}
                className="avatar"
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogOut}>
                  <LogoutIcon />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
          <div className="item">
            <h2 style={{ color: "white" }}>
              {role == "superAdmin" ? "Սուպեր Ադմին" : "Ադմին"}
            </h2>
          </div>
          {data?.length > 0 && (
            <Button
              variant="contained"
              sx={{
                background: "white",
                color: "red",
                "&:hover": {
                  color: "#1d37de",
                  backgroundColor: "white",
                },
              }}
              onClick={() => navigate(DELETED_PAGE)}
            >
              Դուք ունեք նոր ջնջված տվյալ
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
